const ClientAdapter = require('./ClientAdapter')
const conf = require('./../conf')
const uuidv4 = require('uuid/v4')
const fs = require('fs')
const path = require('path')
const WxClient = require('./wxClient')
const log = console

class MockClientAdapter extends ClientAdapter {
  constructor (clientId, clientType) {
    console.log(clientId, clientType)
    super(clientId, clientType)

    this.mockBot = null

    this.contactSelf = {
      id: conf.botUserName
    }

    this._registerHubActions()
  }

  async _newmockBot (loginInfo) {
    const wxClient = new WxClient()
    return wxClient
  }


  async _syncContact () {
    // 向服务器发送联系人列表 群列表
  }

  // 注册微信客户端的一系列事件
  _registerBotActions () {
    
    this.mockBot
      // emit when the bot needs to show you a QR Code for scanning
      .on('scan', async (url, status) => {
        if (status === 0) {
          this.sendHubEvent(ClientAdapter.HubEvent.LOGIN_SCAN, { url, status })
        } else if (status === 3) {
          // 设置二维码已过期的自杀逻辑
          this.sendHubEvent(ClientAdapter.HubEvent.LOGOUT_DONE, {})
          process.exit(0)
        } else if (status === 1) {
          // 已扫码，请在手机端登陆确认
          this.sendHubEvent(ClientAdapter.HubEvent.LOGIN_SCAN, { url: 'CONFIRM_ON_PHONE', status })
        } else if (status === 4) {
          // 手机端取消登陆！
          this.sendHubEvent(ClientAdapter.HubEvent.LOGIN_SCAN, {
            url: 'CANCEL_ON_PHONE',
            status
          })
        }
      })
      .on('login', async userSelf => {
        log.debug(`on login: ${JSON.stringify(userSelf)}`, userSelf.id)
        this.contactSelf = userSelf
        this._responseLoginDone()
        // this.sendHubEvent(ClientAdapter.HubEvent.LOGIN_DONE, {
        //   userName: userId
        // })
      })
      // emit when all data has load completed, in wechaty-puppet-padchat, it means it has sync Contact and Room completed
      .on('ready', async () => {
        log.debug('READY')
        await this._syncContact()
      })
      // emit after the bot log out
      .on('logout', async userSelf => {
        log.debug(`on logout: ${userSelf}`)
        this.sendHubEvent(ClientAdapter.HubEvent.LOGOUT_DONE, '用户已主动登出')
        // 退出登陆以后立即自杀
        process.exit(0)
      })
      // emit when someone sends bot a friend request
      .on('friendship', async friendship => {
        this.sendHubEvent(ClientAdapter.HubEvent.FRIEND_REQUEST, friendship)
      })
      // emit when there's a new message
      .on('message', async message => {
        this.sendHubEvent(ClientAdapter.HubEvent.MESSAGE, message)
      })
      // emit when anyone join any room
      .on('room-join', message => {
        // TODO
        this.sendHubEvent(ClientAdapter.HubEvent.GROUPINFO, message)
      })
      // // emit when someone change room topic
      // .on('room-topic', (room, newTopic, oldTopic, changer) => {
      //   log.debug(`on room-topic: ${room} ${newTopic} ${oldTopic} ${changer}`)
      // })
      // // emit when anyone leave the room
      // .on('room-leave', (room, leaverList) => {
      //   log.debug(`on room-leave: ${room} ${leaverList}`)
      // })
      // // emit when there is a room invitation
      // .on('room-invite', (room, inviterList) => {
      //   log.debug(`on room-invite: ${room} ${inviterList}`)
      // })
      // // When the bot get error, there will be a Wechaty error event fired.
      // .on('error', async (error) => {
      //   // 
      // })
      // // Get bot’s heartbeat.
      // .on('heartbeat', (data) => {
      //   // 
      // })      
      .on('contactInfo', contactInfo => {
        this.sendHubEvent(ClientAdapter.HubEvent.CONTACTINFO, contactInfo)
      })
      .on('status-message', () => {
            /**
             * 消息类型
             *  1  文字消息
             *  2  好友信息推送，包含好友，群，公众号信息
             *  3  收到图片消息
             *  34 语音消息
             *  35 用户头像buf
             *  37 收到好友请求消息
             *  42 名片消息
             *  43 视频消息
             *  47 表情消息
             *  48 定位消息
             *  49 APP消息(文件 或者 链接 H5)
             *  50 语音通话
             *  51 状态通知（如打开与好友/群的聊天界面）
             *  52 语音通话通知
             *  53 语音通话邀请
             *  62 小视频
             *  2000   转账消息
             *  2001   收到红包消息
             *  3000   群邀请
             *  9999   系统通知
             *  10000  微信通知信息. 微信群信息变更通知，多为群名修改，进群，离群信息，不包含群内聊天信息
             *  10002  撤回消息
             */
      })
  }

  // 注册chathub的一系列指令操作
  _registerHubActions () {
    fs.readdirSync(path.join(__dirname, './../actions'))
    .filter(file => file !== 'index.js' && /\.js/.test(file) !== -1 )
    .forEach(file => {
      this.registerHubAction(file.split(/\./)[0], require(path.join(__dirname, './../actions', file))())
    })
  }

  // 通知chathub登陆完成，在多处使用
  // 1. 在收到login完成事件时使用
  // 2. 在收到重复的登陆指令时使用
  // 3. 在GRPC断线重连的时候使用
  async _responseLoginDone () {
    const userId = this.contactSelf.id

    this.sendHubEvent(ClientAdapter.HubEvent.LOGIN_DONE, {
      userName: userId,
      nickname: 'good'
    })
  }

  /**
   * 必须要实现以下方法，在GrpcClient中有调用
   * @param loginInfo
   * {
   *      userId: '',
   *      token: '',
   *      wxData: ''
   * }
   * @return {Promise<*>}
   */
    async login (loginInfo) {
      // 如果bot还活着但是chathub请求登陆，此时可能是GRPC断线了
      // 则直接告诉chathub，登陆完成
      if (this.mockBot) {
        await this._responseLoginDone()
        return
      }
      
      // 否则重新执行登陆流程
      this.mockBot = await this._newmockBot(loginInfo)
      // 注册botEvent的监听
      this._registerBotActions()
      // 启动Bot
      return this.mockBot.start()
    }
  
    async logout () {
      if (!this.mockBot) {
        return null
      }
  
      await this.mockBot.logout()
      this.mockBot = null
    }
  
    async tryToSendLoginInfoToHub () {
      if (!this.mockBot) {
        return
      }
  
      await this._responseLoginDone()
    }

    isSignedIn () {
      return this.mockBot && this.mockBot.isLoggedIn
    }

}

module.exports = MockClientAdapter
