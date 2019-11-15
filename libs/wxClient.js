/**
 * 用于模拟微信客户端的行为，比如：
 * 1. 下发登陆的二维码
 * 2. 释放已登陆指令
 * 3. 释放各种消息指令，发各种消息，有人要加好友了等等。
 * 4. 提供联系人名单
 */
const EventEmitter = require('events')
const {FileBox} = require('file-box')
const event = require('./../mockData/event')

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
    // scan event
    this.emit('scan', qrcode, 0)
    this.isLoggedIn = true
    // start mock event emmiter
    this.mockEventEmmiter()
  }

  // 
  async mockEventEmmiter () {
    // login event
    await this.sleep(1)
    this.emit('login', event.Login)
    await this.sleep(5)
    // send bot's info
    this.emit('contactInfo', event.ContactInfo)
    // send random contacts
    setInterval(() => {
      event.ContactInfo.username = (Math.round(Math.random() * 10000000)).toString()
      this.emit('contactInfo', event.ContactInfo)
    }, 500)
    // await this.sleep(5)
    // this.emit('roomJoin', event.RoomJoin)
    // await this.sleep(5)
    // this.emit('message', event.TextMessage)
    // await this.sleep(5)
    // this.emit('message', event.UrlMessage)
    // await this.sleep(5)
    // this.emit('message', event.MiniProgramMessage)
    // await this.sleep(5)
    // this.emit('message', event.ImageMessage)
    // await this.sleep(5)
    // this.emit('friendship', event.FriendRequest)
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