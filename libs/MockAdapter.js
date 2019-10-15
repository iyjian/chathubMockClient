const BotAdapter = require('./BotAdapter')
const config = require('./../conf')
const uuidv4 = require('uuid/v4')
const path = require('path')
const WxClient = require('./wxClient')
const log = console

class MockAdapter extends BotAdapter {
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
    this._setupObjectDecoders()
  }

  async _newmockBot (loginInfo) {
    console.log('_newmockBot')
    const wxClient = new WxClient()
    return wxClient
  }


  async _responseLoginDone () {
    const userId = this.contactSelf.id

    this.sendHubEvent(BotAdapter.HubEvent.LOGIN_DONE, {
      userName: userId
    })
  }

  async _syncContact () {
    // 向服务器发送联系人列表 TODO
    const allContacts = []

    allContacts.map(contact => {
      this.sendHubEvent(BotAdapter.HubEvent.CONTACTINFO, {
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
      this.sendHubEvent(BotAdapter.HubEvent.CONTACTINFO, {
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
          const mentionsContacts = await Promise.all(mentions.map(m => this.decodeObject(m, BotAdapter.ObjectType.Contact)))
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
          this.sendHubEvent(BotAdapter.HubEvent.EMOJIMESSAGE, payload)
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
          this.sendHubEvent(BotAdapter.HubEvent.IMAGEMESSAGE, payload)
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
          this.sendHubEvent(BotAdapter.HubEvent.MESSAGE, payload)
        },

        [MessageType.Video]: (message) => {
          //
        },
        // URL消息中的content给了一个原始的xml格式
        [MessageType.Url]: async (message) => {
          const payload = await preparePayload(message, true)
          payload.description = message.from() + ' : 收到一个链接消息'
          payload.mType = 49
          this.sendHubEvent(BotAdapter.HubEvent.MESSAGE, payload)
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
          this.sendHubEvent(BotAdapter.HubEvent.MESSAGE, payload)
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
          this.sendHubEvent(BotAdapter.HubEvent.LOGIN_SCAN, { url, status })
        } else if (status === 3) {
          // 设置二维码已过期的自杀逻辑
          this.sendHubEvent(BotAdapter.HubEvent.LOGOUT_DONE, {})
          process.exit(0)
        } else if (status === 1) {
          // 已扫码，请在手机端登陆确认
          this.sendHubEvent(BotAdapter.HubEvent.LOGIN_SCAN, { url: 'CONFIRM_ON_PHONE', status })
        } else if (status === 4) {
          // 手机端取消登陆！
          this.sendHubEvent(BotAdapter.HubEvent.LOGIN_SCAN, { url: 'CANCEL_ON_PHONE', status })
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
        this.sendHubEvent(BotAdapter.HubEvent.LOGOUT_DONE, '用户已主动登出')
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
          const payload = await this.decodeObject(friendship, BotAdapter.ObjectType.Friendship)
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
          this.sendHubEvent(BotAdapter.HubEvent.FRIEND_REQUEST, payload)
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
    /**
         * @toUserName:
         * - to user: wx1234124
         * - to room: 123424@chatroom
         * -
         */
    this.registerHubAction('SendTextMessage', async (actionBody) => {
      const toUserName = actionBody.toUserName
      const content = actionBody.content
      const atList = actionBody.atList
      if (toUserName === undefined || content === undefined || atList === undefined) {
        log.error('send text message empty')
        return
      }

      const atContacts = []
      // TODO: @列表还没有做
      if (atList && atList.length > 0) {
        // atContacts = await this._findContacts({id: atList});
        const contact = await this._findTargetById(atList[0])
        atContacts = [contact]
      }

      const target = await this._findTargetById(toUserName)
      log.debug('SendTextMessage', `toUserName: ${toUserName}`, target)
      await target.say(content, ...atContacts)
    })

    // 发送小程序卡片和发送H5链接卡片都是用这个
    // TODO:小程序卡片的发送没有处理
    this.registerHubAction('SendAppMessage', async (actionBody) => {
      // console.log(actionBody)
      const toUserName = actionBody.toUserName
      const content = actionBody.content
      if (toUserName === undefined || content === undefined) {
        log.error('send app message empty')
        return
      }

      log.debug('SendAppMessage', 'content', JSON.stringify({
        description: content.msg.appmsg.des,
        thumbnailUrl: content.msg.appmsg.thumburl,
        title: content.msg.appmsg.title,
        url: content.msg.appmsg.url
      }))

      const linkMessage = new this.mockBot.UrlLink({
        description: content.msg.appmsg.des,
        thumbnailUrl: content.msg.appmsg.thumburl,
        title: content.msg.appmsg.title,
        url: content.msg.appmsg.url
      })

      const target = await this._findTargetById(toUserName)
      target.say(linkMessage)
    })

    this.registerHubAction('SendImageMessage', async (actionBody) => {
      const {toUserName, payload} = actionBody
      if (toUserName === undefined || payload === undefined) {
        log.error('SendImageMessage', 'invalid parameter')
        return
      }
      const file = FileBox.fromBase64(payload, uuidv4() + `.jpg`)
      const target = await this._findTargetById(toUserName)
      await target.say(file) 
    })

    // 发送带有imageId的图片消息，先在本地缓存找，如果找不到再去云上找
    this.registerHubAction('SendImageResourceMessage', async (actionBody) => {
      const toUserName = actionBody.toUserName
      const imageId = actionBody.imageId
      if (toUserName === undefined || imageId === undefined) {
        log.error('send image message empty')
        return
      }

      let file

      if (fs.existsSync(`cache/${imageId}`)) {
        // 本地有cache 优先用cache
        file = FileBox.fromFile(`cache/${imageId}`)
      } else {
        // 否则用oss上的
        if (ossClient) {
          const ossResult = await ossClient.get(`chathub/images/${imageId}`)
          file = FileBox.fromBuffer(ossResult.content, `${imageId}.jpg`)
        }
      }

      const target = await this._findTargetById(toUserName)
      await target.say(file)
    })

    this.registerHubAction('AcceptUser', async (payload) => {
      /**
             * payload:
             * {
                  "contactId": "wxid_b7rvs8pdawnu21",
                  "hello": "我是潘小强",
                  "id": "7652425311615249121",
                  "stranger": "v1_1959335e949eba970bc8d3da307f1e2c4237bc5a4ceb7c40cfddadcbb77f32c50fe8ee3c0a63a302a280845fce9f5bec@stranger",
                  "ticket": "v2_acd0f0a71df04f222ff4d9c8910da209688b5e372dd555f354017dff2be772e547d09b257d99eaa9405c7fa956a663c1218ec705c8632616cde8e137b9cbae88@stranger",
                  "type": 2
                }
             */
      // 通过 payload 重建 friendship 对象
      // payload.type = this.mockBot.Friendship.Type.Receive
      payload.id = uuidv4()
      const friendShip = this.mockBot.Friendship.load(payload.id)
      friendShip.payload = payload
      await this.mockBot.puppet.manager.saveFriendship(friendShip.payload.id, friendShip.payload)
      // await this.mockBot.puppet.cacheManager.setFriendshipRawPayload(friendShip.payload.id, friendShip.payload)

      // const type = friendShip.type();
      // if (type === this.mockBot.Friendship.Type.Receive) {
      await friendShip.accept()
      // }
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
      // return await Promise.all(contacts.map(async (contact) => this.decodeObject(contact, BotAdapter.ObjectType.Contact)))
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
      // return this.decodeObject(contact, BotAdapter.ObjectType.Contact)
    })

    // TODO: need implement after wechaty puppet support timeline operation
    this.registerHubAction('SnsTimeline', async (actionBody) => {
      return ''
    })
  }

  _setupObjectDecoders () {
    this.objectDecoders = {
      [BotAdapter.ObjectType.Room]: async (room, options) => {
        /**
                 {
                  "id": "12117117522@chatroom",
                  "memberIdList": "[\"vagase\",\"wxid_4njphaafgcnb12\",\"wxid_6531975319512\",\"Joully\"]\n",
                  "ownerId": "vagase",
                  "topic": "kol-explorer"
                }
                 */

        // 因为 memberIdList 会很长，所以除非 fullfill 否则不 populate 这个字段

        const result = Object.assign({}, room.payload)

        if (options.fullfill) {
          const ownerId = result.ownerId
          const memberIdList = JSON.parse(result.memberIdList)

          delete result.ownerId
          delete result.memberIdList

          const owner = await this._findTargetById(ownerId)
          result.owner = await this.decodeObject(owner, BotAdapter.ObjectType.Contact)
          result.members = await Promise.all(memberIdList.map(async memberId => {
            const member = await this._findTargetById(memberId)
            return this.decodeObject(member, BotAdapter.ObjectType.Contact)
          }))
        } else {
          try {
            if (typeof result.memberIdList === 'string') {
              result.memberIdList = JSON.parse(result.memberIdList)
            }
          } catch (e) {

          }
        }

        return result
      },

      [BotAdapter.ObjectType.Contact]: (contact) => {
        /**
                    {
                      "alias": "",
                      "avatar": "http://wx.qlogo.cn/mmhead/ver_1/Jd7qTsCApoKIY0j85OXzdMVoDT6bzROw8ibWiaBs47qmeC4lnJs0UB4DG8Sy0ibAE1rSg8vSehbGCIWS8ukQ6SWIQ/0",
                      "city": "",
                      "gender": 1,
                      "id": "vagase",
                      "name": "好大",
                      "province": "",
                      "signature": "良好的判断力源于经验，而经验则往往来自于错误的判断。",
                      "type": 1,
                      "friend": true
                    }
                 */
        return Object.assign({}, contact.payload)
      },

      [BotAdapter.ObjectType.Friendship]: async (friendship, options) => {
        /**
                {
                    "domain": null,
                    "_events": {},
                    "_eventsCount": 0,
                    "id": "1729841985215778218",
                    "payload": {
                        "contactId": "vagase",
                        "hello": "你好",
                        "id": "1729841985215778218",
                        "stranger": "v1_4bee831025c1714f8317135ebabfffd188afe4fe6bc78aa5d7b082e8ec801668@stranger",
                        "ticket": "v2_44ad35fc8b57ec0db00e65189a66206033e20d64e53d74511c26f1a98a3682c90627cb45c50463ce7082623cf94f15b4@stranger",
                        "type": 2
                    }
                }
                */
        return { content: friendship.payload }
      },

      [BotAdapter.ObjectType.Message]: async (message, options) => {
        /*
                {
                  "id": "2724616628474814304",
                  "timestamp": 1552545170,
                  "type": 7,
                  "fromId": "vagase",
                  "from": {...},
                  "text": "test",
                  "toId": "wxid_4njphaafgcnb12"
                  "to": {...},
                  "roomId": 'xxxx',
                  "room: {...}
                }
                 */

        const messagePayload = Object.assign({}, message.payload)

        if (options.fullfill) {
          const from = await this.decodeObject(message.from(), BotAdapter.ObjectType.Contact)
          const to = await this.decodeObject(message.to(), BotAdapter.ObjectType.Contact)
          const room = await this.decodeObject(message.room(), BotAdapter.ObjectType.Room)

          messagePayload.from = from
          messagePayload.to = to
          messagePayload.room = room
        }

        return messagePayload
      },

      [BotAdapter.ObjectType.RoomInvitation]: (roomInvitation) => {

      }
    }
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

module.exports = MockAdapter
