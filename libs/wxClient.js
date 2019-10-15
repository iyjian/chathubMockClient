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
  }

  sleep (s) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, s)
    })
  }

  async start () {
    await this.sleep(2)
    const qrcode = await f.toDataURL()
    this.emit('scan', qrcode, 0)
    await this.sleep(2)
    this.emit('login', {
      id: 'mockWechatAccount'
    })
  }
}

module.exports = mockBot