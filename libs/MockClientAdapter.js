const ClientAdapter = require('./ClientAdapter')
const config = require('../conf')
const uuidv4 = require('uuid/v4')
const path = require('path')
const WxClient = require('./wxClient')
const log = console

class MockClientAdapter extends ClientAdapter {
  constructor (token) {
    const clientId = config.clientId
    const clientType = config.clientType
    super(clientId, clientType)

    this.mockBot = null
    this.token = token

    this.contactSelf = {
      id: 'mockingUser'
    }

    this._registerHubActions()
  }

  async _newmockBot (loginInfo) {
    console.log('_newmockBot')
    const wxClient = new WxClient()
    return wxClient
  }


  async _responseLoginDone () {
    const userId = this.contactSelf.id

    this.sendHubEvent(ClientAdapter.HubEvent.LOGIN_DONE, {
      userName: userId
    })
  }

  async _syncContact () {
    // 向服务器发送联系人列表 TODO
    const allContacts = []

    allContacts.map(contact => {
      this.sendHubEvent(ClientAdapter.HubEvent.CONTACTINFO, {
        username: contact.id,
        nickname: contact.name(),
        type: 'WECHATBOT',
        alias: '',
        SmallHead: contact.payload.avatar,
        sex: contact.gender(),
        country: 'CN',
        province: contact.province(),
        city: contact.city(),
        signature: ''
      })
    })

    // 向服务器发送聊天室列表 TODO
    const rooms = []

    rooms.map(room => {
      this.sendHubEvent(ClientAdapter.HubEvent.CONTACTINFO, {
        username: room.payload.id,
        type: 'WECHATBOT',
        alias: '',
        nickname: room.payload.topic,
        SmallHead: room.payload.avatar,
        memberCount: room.payload.memberIdList.length,
        maxMemberCount: 500,
        ChatRoomOwner: room.payload.ownerId
      })
    })
  }

  // 注册微信客户端的一系列事件
  _registerBotActions () {
    // 这里的message是wechaty里的原生message对象
    const _handleBotMessage = async (message) => {
      const MessageType = this.mockBot.Message.Type

      const preparePayload = async (message, xmlContent = false) => {
        const payload = {}
        payload.content = message.text()
        payload.fromUser = message.from().id
        payload.toUser = message.to() ? message.to().id : message.room().id
        payload.continue = 1
        payload.timestamp = message.date() ? Math.round(+message.date() / 1000) : 0// `10位`
        // TODO: 这里是假的msgId 需要用from to content time来md5
        payload.msgId = uuidv4()
        // 群消息
        if (message.room()) {
          payload.groupId = await message.room().id
          payload.groupName = await message.room().topic()

          const mentions = await message.mention() || []
          const mentionsContacts = await Promise.all(mentions.map(m => this.decodeObject(m, ClientAdapter.ObjectType.Contact)))
          if (mentionsContacts.length) {
            payload.atList = mentionsContacts
          }
        }

        if (xmlContent) {
          let xml = await parseXml(payload['content'])
          if (xml) {
            payload['content'] = xml
          } else {
            log.error('message content is not xml format: ', xml)
          }
        }

        return payload
      }

      const handlersDict = {
        [MessageType.Attachment]: (message) => {
        },

        [MessageType.Audio]: (message) => {
        },

        [MessageType.Contact]: async (message) => {
        },

        [MessageType.Emoticon]: async (message) => {
          /**
                     <msg>
                     <emoji fromusername="vagase" tousername="wxid_4njphaafgcnb12" type="2" idbuffer="media:0_0" md5="aeb0975bbfa236b0d3ceb49f5d0066ec"
                     len="35598" productid="com.tencent.xin.emoticon.person.stiker_1523884497529b0b6c6b473f5e" androidmd5="aeb0975bbfa236b0d3ceb49f5d0066ec"
                     androidlen="35598" s60v3md5="aeb0975bbfa236b0d3ceb49f5d0066ec" s60v3len="35598" s60v5md5="aeb0975bbfa236b0d3ceb49f5d0066ec"
                     s60v5len="35598" cdnurl="http://emoji.qpic.cn/wx_emoji/ydZXa4cljfLicPHsB99gf9QIwAsY2CdZz0CicovRqjmXyXPwcAxQDuRiaibU9vuztm34/"
                     designerid="" thumburl="http://mmbiz.qpic.cn/mmemoticon/ajNVdqHZLLDOlsGtttOfyNbyecMWTWx5ibx8gOI3mxytnZ9MMTTABCdmxJl1T4N0B/0"
                     encrypturl="http://emoji.qpic.cn/wx_emoji/ydZXa4cljfLicPHsB99gf9QIwAsY2CdZz0CicovRqjmXwicg3Mx0h7PR6ozGXfM9lII/"
                     aeskey="886fd4cd528e2a4a39fec7b2a81b71c3" externurl="http://emoji.qpic.cn/wx_emoji/ydZXa4cljfLicPHsB99gf9QIwAsY2CdZz0CicovRqjmXyVupyicOjfxU4FPhb5ic1BKk/"
                     externmd5="f62e4409732dc762bba157069dc7fcb7" width="240" height="240" tpurl="" tpauthkey="" attachedtext=""
                     attachedtextcolor="" lensid=""></emoji>
                     <gameext type="0" content="0"></gameext>
                     </msg>
                     * @type {*}
                     */
          const payload = await preparePayload(message, true)
          this.sendHubEvent(ClientAdapter.HubEvent.EMOJIMESSAGE, payload)
        },

        [MessageType.Image]: async (message) => {
          /**
                     <?xml version="1.0"?>
                     <msg>
                     <img aeskey="3820e3f776a09eac131488507aa73a11" encryver="1" cdnthumbaeskey="3820e3f776a09eac131488507aa73a11" cdnthumburl="30500201000449304702010002040efc543e02032f56c30204a8af947502045c9b284d0422373838363134373430344063686174726f6f6d313735355f313535333637323236390204010800020201000400" cdnthumblength="3656" cdnthumbheight="67" cdnthumbwidth="120" cdnmidheight="0" cdnmidwidth="0" cdnhdheight="0" cdnhdwidth="0" cdnmidimgurl="30500201000449304702010002040efc543e02032f56c30204a8af947502045c9b284d0422373838363134373430344063686174726f6f6d313735355f313535333637323236390204010800020201000400" length="12661" md5="768dcc20cf6c47c24ad2f1b9824907e0" />
                     </msg>
                     */
          const payload = await preparePayload(message, true)
          payload.description = message.from() + ' : 收到一张图片消息'
          payload.mType = 3
          // 检查图片格式
          const ext = path.extname(message.payload.filename).slice(1).toLowerCase() || ''
          let imageId = this.contactSelf.id + '-' + uuidv4() + '.' + ext
          payload.imageId = imageId
          // 在本地存放一份
          const fileBox = await message.toFileBox()
          await fileBox.toFile(`cache/${imageId}`)
          // 在云上存储一份
          if (ossClient) {
            try {
              log.info(`上传 发送图片 至aliyun oss... chathub/images/${imageId}`)
              const buffer = await fileBox.toBuffer()
              const result = await ossClient.put(`chathub/images/${imageId}`, buffer)
              if (result.res && result.res.status === 200) {
                log.debug(`上传图片 ${result.name} 完成`)
              } else {
                imageId = null
                log.debug('上传图片返回', result)
              }
            } catch (e) {
              log.error('上传 发送图片 失败', e)
            }
          }
          this.sendHubEvent(ClientAdapter.HubEvent.IMAGEMESSAGE, payload)
        },

        [MessageType.Text]: async (message) => {
          const text = message.text()
          if (/ding/.test(text)) {
            await message.say('dong. receive: ' + text)
            return
          }
          const payload = await preparePayload(message)
          payload.description = message.from() + ' : ' + payload.content
          payload.mType = 1
          this.sendHubEvent(ClientAdapter.HubEvent.MESSAGE, payload)
        },

        [MessageType.Video]: (message) => {
          //
        },
        // URL消息中的content给了一个原始的xml格式
        [MessageType.Url]: async (message) => {
          const payload = await preparePayload(message, true)
          payload.description = message.from() + ' : 收到一个链接消息'
          payload.mType = 49
          this.sendHubEvent(ClientAdapter.HubEvent.MESSAGE, payload)
        },

        [MessageType.MiniProgram]: async (message) => {
          /**
            小程序卡片
          */
          // // 以下代码为puppet加工过的小程序content的处理，在macpro中使用以下格式
          // // 在padplus中他又没有去处理，所以沿用url message的处理方式
          // const payload = await preparePayload(message)
          // let matches = payload.content.match(/\[.*?\]/g)
          // matches = matches.map(o => o.replace(/\[/, '').replace(/\]/, ''))
          // const title = matches[0]
          // const appId = matches[1].split(':')[1]
          // const cdnurl = matches[2].split(':')[1]
          // const cdnkey = matches[3].split(':')[1]
          // const pages = matches[4].split(':')[1]
          // payload.description = message.from() + ' : 收到一个小程序卡片'
          // payload.mType = 49
          // payload.content = {
          //   msg: {
          //     appmsg: {
          //       title,
          //       type: '33', // 小程序
          //       cdnurl,
          //       cdnkey,
          //       pages,
          //       appId
          //     }
          //   }
          // }
          const payload = await preparePayload(message, true)
          payload.description = message.from() + ' : 收到一个小程序卡片'
          payload.mType = 49
          this.sendHubEvent(ClientAdapter.HubEvent.MESSAGE, payload)
        },

        [MessageType.Unknown]: (message) => {
          log.error('MessageType.Unknow: ' + message.toString())
        }
      }

      const handler = handlersDict[message.type()]
      if (handler) {
        return handler(message)
      } else {
        throw 'unhandled message: ' + message.toString()
      }
    }

    /**
         * 1. 关于 on.login、on.logout、on.error
         *  机器人登录了(on.login)，因为一些问题（比如网络）可能调用 on.logout 或 on.error。
         *  之后机器人会继续尝试登录，当登录成功后会继续调用 on.login
         */

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
          this.sendHubEvent(ClientAdapter.HubEvent.LOGIN_SCAN, { url: 'CANCEL_ON_PHONE', status })
        }
      })
      .on('login', async (userSelf) => {
        log.debug(`on login: ${userSelf}`, userSelf.id)
        this.contactSelf = userSelf
        await this._responseLoginDone()
      })

    // emit when all data has load completed, in wechaty-puppet-padchat, it means it has sync Contact and Room completed
      .on('ready', async () => {
        log.debug('READY')
        await this._syncContact()
      })

    // emit after the bot log out
      .on('logout', async (userSelf) => {
        log.debug(`on logout: ${userSelf}`)
        this.sendHubEvent(ClientAdapter.HubEvent.LOGOUT_DONE, '用户已主动登出')
        // 退出登陆以后立即自杀
        process.exit(0)
      })

    // When the bot get error, there will be a Wechaty error event fired.
      .on('error', async (error) => {
        log.debug(`on error: ${error}`)
      })

    // Get bot’s heartbeat.
      .on('heartbeat', (data) => {
      })

    // emit when someone sends bot a friend request
      .on('friendship', async (friendship) => {
        log.debug(`on friendship: ${friendship}`)

        if (friendship.payload.type === this.mockBot.Friendship.Type.Receive) {
          const payload = await this.decodeObject(friendship, ClientAdapter.ObjectType.Friendship)
          /**
                     *
                     * {
                     *  "content":{
                     *     "contactId":"wxid_ffk05mmvo73s22",
                     *     "hello":"","id":"6152324514431164274",
                     *     "stranger":"v1_58eff4729ddb1004e248538923bb570dccca278b7bce029a3cebb898142fa128c2427aa6649174943edd27cef046f12b@stranger",
                     *     "ticket":"v2_cafe0fe7ae89bc79294b1ec7566eea379fd91d7314212b64bc28730d7b3da3e2e2ae53749e0e27e2815a762175a214c30f5fa468f063d617195069c0f951fb1f@stranger",
                     *     "timestamp":1568110642147,"type":2
                     *  }
                     * }
                     * */
          this.sendHubEvent(ClientAdapter.HubEvent.FRIEND_REQUEST, payload)
        }
      })

    // 	emit when there's a new message
      .on('message', async (message) => {
        log.debug(`on message: ${message.toString()}`)

        // 仅推送30秒之前的数据
        if (message.age() >= 30 * 60) {
          return
        }

        await _handleBotMessage(message)
      })

    // emit when anyone join any room
      .on('room-join', (room, inviteeList) => {
        log.debug(`on room-join: ${room} ${inviteeList}`)
      })

    // emit when someone change room topic
      .on('room-topic', (room, newTopic, oldTopic, changer) => {
        log.debug(`on room-topic: ${room} ${newTopic} ${oldTopic} ${changer}`)
      })

    // emit when anyone leave the room
      .on('room-leave', (room, leaverList) => {
        log.debug(`on room-leave: ${room} ${leaverList}`)
      })

    // emit when there is a room invitation
      .on('room-invite', (room, inviterList) => {
        log.debug(`on room-invite: ${room} ${inviterList}`)
      })
  }

  // 注册chathub的一系列指令操作
  _registerHubActions () {

    this.registerHubAction('SendTextMessage', async (actionBody) => {
      const toUserName = actionBody.toUserName
      const content = actionBody.content
      const atList = actionBody.atList
    })

    // 发送小程序卡片和发送H5链接卡片都是用这个
    // TODO:小程序卡片的发送没有处理
    this.registerHubAction('SendAppMessage', async (actionBody) => {
      // console.log(actionBody)
      const toUserName = actionBody.toUserName
      const content = actionBody.content
    })

    this.registerHubAction('SendImageMessage', async (actionBody) => {
      const {toUserName, payload} = actionBody
    })

    // 发送带有imageId的图片消息，先在本地缓存找，如果找不到再去云上找
    this.registerHubAction('SendImageResourceMessage', async (actionBody) => {
      const toUserName = actionBody.toUserName
      const imageId = actionBody.imageId
    })

    this.registerHubAction('AcceptUser', async (payload) => {
      // 
    })

    this.registerHubAction('AddContact', async (actionBody) => {
      const stranger = actionBody.stranger
      const content = actionBody.content
    })

    this.registerHubAction('DeleteContact', async (actionBody) => {
      const userId = actionBody
    })

    this.registerHubAction('SayHello', async (actionBody) => {
      const stranger = actionBody.stranger
      const ticket = actionBody.ticket
      const content = actionBody.content
    })

    this.registerHubAction('GetContact', async (actionBody) => {
      const userId = actionBody.userId
      // return this._findTargetById(userId)
    })

    this.registerHubAction('CreateRoom', async (actionBody) => {
      const userList = actionBody.userList
      // return {
      //   userName: roomCreated.id,
      //   status: 0
      // }
    })

    this.registerHubAction('GetRoomMembers', async (actionBody) => {
      const groupId = actionBody.groupId
      // return await Promise.all(contacts.map(async (contact) => this.decodeObject(contact, ClientAdapter.ObjectType.Contact)))
    })

    this.registerHubAction('GetRoomQRCode', async (actionBody) => {
      const groupId = actionBody.groupId
      // return room.qrcode()
    })

    this.registerHubAction('AddRoomMember', async (actionBody) => {
      const groupId = actionBody.groupId
      const userId = actionBody.userId
    })

    this.registerHubAction('InviteRoomMember', async (actionBody) => {
      const groupId = actionBody.groupId
      const userId = actionBody.userId
      // 
    })

    this.registerHubAction('DeleteRoomMember', async (actionBody) => {
      const groupId = actionBody.groupId
      const userId = actionBody.userId
    })

    this.registerHubAction('SetRoomAnnouncement', async (actionBody) => {
      const groupId = actionBody.groupId
      const content = actionBody.content
    })

    this.registerHubAction('SetRoomName', async (actionBody) => {
      const groupId = actionBody.groupId
      const content = actionBody.content
    })

    this.registerHubAction('GetContactQRCode', async (actionBody) => {
      const userId = actionBody.userId
      const style = actionBody.style
      // return this.contactSelf.qrcode()
    })

    this.registerHubAction('SearchContact', async (actionBody) => {
      const userId = actionBody.userId
      // return this.decodeObject(contact, ClientAdapter.ObjectType.Contact)
    })

    // TODO: need implement after wechaty puppet support timeline operation
    this.registerHubAction('SnsTimeline', async (actionBody) => {
      return ''
    })
  }

  isSignedIn () {
    return this.mockBot && this.mockBot.logonoff()
  }

  /**
     * @param loginInfo
     * {
     *      userId: '',
     *      token: '',
     *      wxData: ''
     * }
     * @return {Promise<*>}
     */
  async login (loginInfo) {
    // 重复登录，直接返回
    if (this.mockBot) {
      console.log('already logged in')
      await this._responseLoginDone()
      return
    }

    this.mockBot = await this._newmockBot(loginInfo)

    this._registerBotActions()

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
}

module.exports = MockClientAdapter
