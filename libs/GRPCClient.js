/**
 * 
 * !!!!!!! NEVER MODIFY THIS FILE IN THIS PROJECT !!!!!!!!!!!
 * !!!!!!! ANY BUG OR MODIFICATION PLEASE SUBMIT PULL REQUEST TO 
 * !!!!!!! https://github.com/iyjian/chathubmockserver
 * 
 */
const messages = require('../proto/chatbothub/chatbothub_pb')
const services = require('../proto/chatbothub/chatbothub_grpc_pb')
const grpc = require('grpc')
const config = require('../conf')
const _ = require('lodash')
const BotAdapter = require('./ClientAdapter')
const EventEmitter = require('events')
const log = require('./log')
const mutePingPongLog = true

/**
 * BotClient is the middle proxy between hub and client.
 * - communicate with hub with grpc long connection
 * - communicate with client with client's sdk
 * @type {module.BotClient}
 */
class GRPCClient extends EventEmitter {
  constructor (botAdapters) {
    super()

    this.botAdapters = botAdapters
    
    this._setupBotAdapter()

    this.running = false
    this.pingTimes = 1

    /**
         * loginInfo:
         * {
         *     userId: '',
         *     token: '',
         *     wxData: ''
         * }
         * @type {null}
         */
    this.loginInfo = null
    this.botId = null
    this.tunnel = null

    this.heartBeatTimer = null
    this.heartBeatInterval = 10 * 1000
  }

  _setupBotAdapter () {

    for (const botAdapter of Object.values(this.botAdapters)) {
      botAdapter['adapter'].registerBotCallback(BotAdapter.Callback.SEND_HUB_EVENT, async ({ eventType, eventBody }) => {
        if (eventType === 'LOGINDONE') {
          eventBody.botId = this.botId
        }
  
        return this._sendEventToHub(botAdapter['clientId'], botAdapter['clientType'], eventType, eventBody)
      })
    }

  }

  _stop (notify = false) {
    if (!this.running) {
      return
    }

    this._stopHubHeartBeat()

    this.tunnel.end()
    this.tunnel = null
    this.running = false

    if (notify) {
      this.emit('stop')
    }

    // stop client will not logout client botAdapter
  }

  /**
   * 
   * @param {*} body chathub的指令内容，例如：
   * {"botId":"3599f45e-8907-4543-ace7-6028e94a5173","login":"placeHolder","password":"","loginInfo":""}
   */
  async _handleLoginRequest (clientId, body) {

    const loginBody = JSON.parse(body)

    this.botId = loginBody.botId

    // 如果请求中带了登陆信息：62数据
    if (loginBody.loginInfo.length > 0) {
      try {
        const loginInfo = JSON.parse(loginBody.loginInfo)
        if (Object.keys(loginInfo).length > 0) {
          loginInfo.userId = loginBody.login

          this.loginInfo = loginInfo
        }
      } catch (e) {
        console.error('login info is not json format: ', e)
        process.exit(0)
      }
    }

    await this.botAdapters[clientId]['adapter'].login(this.loginInfo)
  }

  // 处理chathub的指令，处理完毕后调用 --> _replyActionToHub --> _sendEventToHub
  async _handleEventFromHub (event) {
    const eventType = event.getEventtype()
    const body = event.getBody()
    const clientId = event.getClientid()
    const clientType = event.getClienttype()
    const botClientId = event.getBotclientid()
    const botClientType = event.getBotclienttype()
    const botId = event.getBotid()

    if (eventType !== 'PING' && eventType !== 'PONG') {
      // console.log(event)
    }

    if (!(this.botAdapters && this.botAdapters[clientId] && this.botAdapters[clientId]['adapter'])) {
      log.error('_handleEventFromHub', `invalidClientId`, `clientId: ${clientId} clientType: ${clientType} eventType: ${eventType}`)
      return
    }


    let actionType = ''
    let parsedBody = {}

    if (body) {
      try {
        parsedBody = JSON.parse(body)
        actionType = parsedBody.actionType
      } catch (e) {
        //
      }
    }

    const startTime = new Date()

    if (eventType === 'PONG') {
      !mutePingPongLog && log.debug('PONG ' + clientType + ' ' + clientId)
      return
    }

    if (eventType === 'PING') {
      // log.trace(`received tunnel event: ${eventType}`)
      return
    } else {
      log.info(`\n`)
      log.info(`----------From Chathub: ${eventType} ${actionType} ${clientId} ${clientType}------------`)
      log.info(`${body}`)
      log.info(`----------From Chathub: ${eventType}------------`)
      log.info(`\n`)
    }

    if (eventType === 'LOGIN') {
      await this._handleLoginRequest(clientId, body)
    } else if (eventType === 'LOGOUT') {
      if (!this.botAdapters[clientId]['adapter'].isSignedIn()) {
        await this._replyActionToHub(eventType, body, null, 'Can not logout, because the bot is not signed on')
        log.error('Can not logout, because the bot is not signed on')
        return
      }
      await this.botAdapters[clientId]['adapter'].logout()
    } else if (eventType === 'SHUTDOWN') {
      // process.exit(0)
    } else if (eventType === 'BOTMIGRATE') {
      // TODO: how to do with BOTMIGRATE?
      log.debug('BOTMIGRATE TO:', botId)
    } else {
      // 剩下的类型都是BOTACTION(maybe)

      if (!this.botAdapters[clientId]['adapter'].isSignedIn()) {
        await this._replyActionToHub(eventType, body, null, 'Bot is not signed on, can not execute any action.')
        log.error(`[${eventType}] Bot is not signed on, can not execute any action: ${body}`)
        return
      }

      try {
        let response = null
        let handled = false

        if (eventType === 'BOTACTION') {
          handled = true

          const actionBody = parsedBody.body

          if (actionType === undefined || actionBody === undefined) {
            log.error('actionBody empty', body)
            return
          }

          // TODO: 因为现在没有朋友圈消息，所以暂时不处理这种情况。
          if (actionType === 'SnsTimeline') {
            return
          }
          // 
          response = await this.botAdapters[clientId]['adapter'].handleHubAction(actionType, actionBody)
        }

        const cost = (new Date()) - startTime

        if (handled) {
          log.info(`\n`)
          log.debug(`-------------To Chathub ActionReply: ${actionType} cost [${cost}ms]--------`)
          log.debug('event request body:')
          log.debug(`${body}`)
          log.debug('event response(you should return this in actions/*):')
          log.debug(`${JSON.stringify(response)}`)
          log.debug(`---------------To Chathub ActionReply: ${actionType} cost [${cost}ms]--------`)
          log.info(`\n`)

          if (actionType === 'GetContact') {
            // 我不确定这里chathub要不要GetContact指令，先加着
            await this._replyActionToHub(clientId, clientType, actionType, parsedBody, response)
            await this._replyActionToHub(clientId, clientType, 'CONTACTINFO', parsedBody, response)
          } else {
            await this._replyActionToHub(clientId, clientType, actionType, parsedBody, response)
          }
        } else {
          log.error(`From Chathub:: ${actionType} ${body} [${cost}ms], fail: unhandled message`)

          await this._replyActionToHub(clientId, clientType, actionType, parsedBody, 'unhandled message')
        }
      } catch (e) {
        const cost = (new Date()) - startTime
        log.error(`From Chathub: ${actionType} ${body} [${cost}ms], fail: ${e.toString()}`)
        await this._replyActionToHub(clientId, clientType, actionType, parsedBody, null, e.toString())
      }
    }
  }

  _sendEventToHub (clientId, clientType, eventType, eventBody) {
    if (this.tunnel === undefined) {
      log.error('grpc connection not established while receiving wxlogin callback, exit.')
      return
    }

    if (_.isEmpty(eventType)) {
      log.error('wxcallback data.eventType undefined', clientId, clientType, eventType, eventBody)
      return
    }

    let bodyStr = ''
    if (eventBody) {
      bodyStr = eventBody
      if (typeof eventBody !== 'string') {
        bodyStr = JSON.stringify(eventBody)
      }

      if (bodyStr.length > 1200 && process.env.NODE_ENV === 'production') {
        // 生产环境上做截断
        bodyStr = bodyStr.substr(0, 1200)
      }
    }

    if (eventType === 'PING') {
      // 这里是屏蔽了发送给ChatHub的ping日志
      !mutePingPongLog && log.trace(`tunnel send: [${eventType}] ${bodyStr}`)
    } else {
      // 可能是单向的给chathub发消息
      log.debug(`\n`)
      log.debug(`-------------To Chathub EVENT: ${eventType}----------------`)
      log.debug(`${bodyStr}`)
      log.debug(`-------------To Chathub EVENT: ${eventType}----------------`)
      log.debug(`\n`)
    }

    const newEventRequest = (clientId, clientType, eventType, body) => {
      const req = new messages.EventRequest()
      req.setEventtype(eventType)
      req.setClientid(clientId)
      req.setClienttype(clientType)

      if (body) {
        if (typeof body === 'string') {
          req.setBody(body)
        } else {
          req.setBody(JSON.stringify(body))
        }
      }

      return req
    }

    this.tunnel.write(newEventRequest(clientId, clientType, eventType, eventBody))
  }

  _replyActionToHub (clientId, clientType, eventType, originalEventBody, data, error) {
    const result = {}
    if (error) {
      result.success = false
      result.error = error
    } else {
      result.success = true
      result.data = Object.assign({ status: 0 }, data)
    }

    return this._sendEventToHub(
      clientId,
      clientType,
      'ACTIONREPLY',
      {
        eventType: eventType,
        body: originalEventBody,
        result
      })
  }

  _startHubHeartBeat () {
    if (this.heartBeatTimer) {
      return
    }

    this.heartBeatTimer = setInterval(async () => {
      for (const botAdapter of Object.values(this.botAdapters)) {
        this._sendEventToHub(botAdapter['adapter'].clientId, botAdapter['adapter'].clientType, 'PING', '')
      }
      
    }, this.heartBeatInterval)
  }

  _stopHubHeartBeat () {
    if (!this.heartBeatTimer) {
      return
    }

    clearInterval(this.heartBeatTimer)
    this.heartBeatTimer = null
  }

  async start () {
    if (this.running) {
      return
    }
    this.running = true

    // init new grpc connection
    log.debug('GRPC Connect', `${config.hubhost}:${config.hubport}`)
    const client = new services.ChatBotHubClient(`${config.hubhost}:${config.hubport}`, grpc.credentials.createInsecure())
    this.tunnel = client.eventTunnel()

    this.tunnel.on('data', async (eventReply) => {
      return this._handleEventFromHub(eventReply)
    })

    this.tunnel.on('error', async (e) => {
      log.error('grpc connection error', e)
      await this._stop(true)
    })

    this.tunnel.on('end', async () => {
      log.info('grpc connection closed')
      await this._stop(true)
    })

    // Register client with hub instantly.
    // await this._sendEventToHub('REGISTER', 'HELLO')
    for (const botAdapter of Object.values(this.botAdapters)) {
      this._sendEventToHub(botAdapter['adapter'].clientId, botAdapter['adapter'].clientType, 'REGISTER', 'HELLO')
    }

    // await this.botAdapters.tryToSendLoginInfoToHub()

    this._startHubHeartBeat()
  }

  async stop () {
    this._stop()
  }
}

module.exports = GRPCClient
