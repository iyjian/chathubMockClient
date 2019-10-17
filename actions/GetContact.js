/**
 * 
 *{
 *  "actionRequestId":"5245ee13-1d08-4d76-b3d9-1d511eec4b42",
 *  "actionType":"GetContact",
 *  "body":"{\"userId\":\"wxid_5753727547512\"}"
 * }
 * 
 */


module.exports = () => {
  return actionBody => {
    return {
      "domain": null,
      "_events": {
        
      },
      "_eventsCount": 0,
      "id": "wxid_5753727547512",
      "payload": {
        "alias": "",
        "avatar": "http://wx.qlogo.cn/mmhead/ver_1/hicapktFFOmGzyqT0xFGeTL7iaqMurZQCO0r1njMwOB73wq9MVC8eWiaOpsLOX7Akw78Uhz90VQlquoEA0Iia3bjIn3GZNoA9y2YlmM7GXTXbTA/132",
        "city": "Xiangtan",
        "friend": true,
        "gender": 2,
        "id": "wxid_5753727547512",
        "name": "小怪兽",
        "province": "Hunan",
        "signature": "",
        "type": 1,
        "weixin": "wxid_5753727547512"
      }
    }
  }
}

/**
 * 应当看  To Chathub ActionReply 中的 event response 来决定return什么东西
 * 
mac001_1_3e7e3a60b846 | [2019-10-17T10:56:24.695] [DEBUG] rpc - -------------To Chathub ActionReply: GetContact cost [3ms]--------
mac001_1_3e7e3a60b846 | [2019-10-17T10:56:24.695] [DEBUG] rpc - event body:
mac001_1_3e7e3a60b846 | [2019-10-17T10:56:24.695] [DEBUG] rpc - {"actionRequestId":"5245ee13-1d08-4d76-b3d9-1d511eec4b42","actionType":"GetContact","body":"{\"userId\":\"wxid_5753727547512\"}"}
mac001_1_3e7e3a60b846 | [2019-10-17T10:56:24.695] [DEBUG] rpc - event response:
mac001_1_3e7e3a60b846 | [2019-10-17T10:56:24.695] [DEBUG] rpc - {"domain":null,"_events":{},"_eventsCount":0,"id":"wxid_5753727547512","payload":{"alias":"","avatar":"http://wx.qlogo.cn/mmhead/ver_1/hicapktFFOmGzyqT0xFGeTL7iaqMurZQCO0r1njMwOB73wq9MVC8eWiaOpsLOX7Akw78Uhz90VQlquoEA0Iia3bjIn3GZNoA9y2YlmM7GXTXbTA/132","city":"Xiangtan","friend":true,"gender":2,"id":"wxid_5753727547512","name":"小怪兽","province":"Hunan","signature":"","type":1,"weixin":"wxid_5753727547512"}}
mac001_1_3e7e3a60b846 | [2019-10-17T10:56:24.695] [DEBUG] rpc - ---------------To Chathub ActionReply: GetContact cost [3ms]--------

 * 
 * 
 */