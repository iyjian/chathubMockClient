/**
 * 用于模拟微信客户端的行为，比如：
 * 1. 下发登陆的二维码
 * 2. 释放已登陆指令
 * 3. 释放各种消息指令，发各种消息，有人要加好友了等等。
 * 4. 提供联系人名单
 */
const EventEmitter = require('events')
const {FileBox} = require('file-box')

// 给chathub一个二维码
const f = FileBox.fromUrl(
  'http://ewm.96weixin.com/resource/image/thumbnail/default.png',
  'logo.jpg'
)

// 模拟微信客户端
class mockBot extends EventEmitter {
  constructor () {
    super()
    this.isLoggedIn = false
  }

  sleep (s) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, s * 1000)
    })
  }

  async start () {
    await this.sleep(2)
    const qrcode = await f.toDataURL()
    this.emit('scan', qrcode, 0)
    await this.sleep(10)
    this.emit('login', {
      id: 'mockWechatAccount'
    })
    this.isLoggedIn = true
  }

  // 是否登陆
  logonoff () {
    return this.isLoggedIn
  }

  logout () {
    this.isLoggedIn = false
  }
}

module.exports = mockBot