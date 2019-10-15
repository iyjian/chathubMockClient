const BotClient = require('./libs/BotClient')
const MockAdapter = require('./libs/MockAdapter')

const mockAdapter = new MockAdapter()

bot = new BotClient(mockAdapter)

bot.start()

// const messages = require('../proto/chatbothub/chatbothub_pb')
// const services = require('../proto/chatbothub/chatbothub_grpc_pb')
// const grpc = require('grpc')
// const config = require('./conf')

// const client = new services.ChatBotHubClient(`${config.hubhost}:${config.hubport}`, grpc.credentials.createInsecure())

// tunnel = client.eventTunnel()

// tunnel.on('data', eventReply => {
//   return _handleEventFromHub(eventReply)
// })

// function _handleEventFromHub (event) {

//   const eventType = event.getEventtype()
//   const body = event.getBody()
//   const clientId = event.getClientid()
//   const clientType = event.getClienttype()
//   let actionType = ''
//   let parsedBody = {}

//   if (body) {
//     try {
//       parsedBody = JSON.parse(body)
//       actionType = parsedBody.actionType
//     } catch (e) {
//       //
//     }
//   }

//   if (eventType === 'PONG') {
//     return
//   }

//   if (eventType === 'PING') {
//     return
//   }

//   if (eventType === 'LOGIN') {
//     //
//   } else if (eventType === 'LOGOUT') {
//     // 
//   } else if (eventType === 'SHUTDOWN') {
//     process.exit(0)
//   } else {
//     // if not logged in just return
//     try {
//       let response = null
//       let handled = false

//       if (eventType === 'BOTACTION') {
        
//         const actionBody = parsedBody.body

//         if (actionType === undefined || actionBody === undefined) {
//           log.error('actionBody empty', body)
//           return
//         }
//         // response = await this.botAdapter.handleHubAction(actionType, actionBody)
//       }
//     } catch (e) {
//       await this._replyActionToHub(actionType, parsedBody, null, e.toString())
//     }
//   }
// }

// _sendEventToHub (eventType, eventBody) {
//   if (this.tunnel === undefined) {
//     log.error('grpc connection not established while receiving wxlogin callback, exit.')
//     return
//   }

//   if (_.isEmpty(eventType)) {
//     log.error('wxcallback data.eventType undefined')
//     return
//   }

//   let bodyStr = ''
//   if (eventBody) {
//     bodyStr = eventBody
//     if (typeof eventBody !== 'string') {
//       bodyStr = JSON.stringify(eventBody)
//     }

//     if (bodyStr.length > 1200) {
//       bodyStr = bodyStr.substr(0, 1200)
//     }
//   }

//   if (eventType === 'PING') {
//     !mutePingPongLog && log.trace(`tunnel send: [${eventType}] ${bodyStr}`)
//   } else {
//     log.debug(`tunnel send: [${eventType}] ${bodyStr}`)
//   }

//   const newEventRequest = (eventType, body) => {
//     const req = new messages.EventRequest()
//     req.setEventtype(eventType)

//     if (body) {
//       if (typeof body === 'string') {
//         req.setBody(body)
//       } else {
//         req.setBody(JSON.stringify(body))
//       }
//     }

//     req.setClientid(this.botAdapter.clientId)
//     req.setClienttype(this.botAdapter.clientType)

//     return req
//   }

//   this.tunnel.write(newEventRequest(eventType, eventBody))
// }

// _replyActionToHub (eventType, originalEventBody, data, error) {
//   const result = {}
//   if (error) {
//     result.success = false
//     result.error = error
//   } else {
//     result.success = true
//     result.data = Object.assign({ status: 0 }, data)
//   }

//   return this._sendEventToHub(
//     'ACTIONREPLY',
//     {
//       eventType: eventType,
//       body: originalEventBody,
//       result
//     })
// }