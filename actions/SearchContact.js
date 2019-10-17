/**
 * 
 * {
 *	"actionRequestId": "92c8d108-4cd8-4d28-8a37-c87f04c190f1",
 *	"actionType": "SearchContact",
 *	"body": "{\"userId\":\"wxid_eweiw7lkmr4n22\"}"
 * }
 * 
 */

module.exports = () => {
  return actionBody => {
    return {
      "alias": "",
      "avatar": "",
      "city": "",
      "friend": false,
      "gender": 0,
      "id": "wxid_eweiw7lkmr4n22",
      "name": "邱瑞文",
      "province": "",
      "signature": "",
      "type": 1,
      "weixin": "wxid_eweiw7lkmr4n22"
    }
  }
}


/**
 * 应当看  To Chathub ActionReply 中的 event response 来决定return什么东西
 * 
mac001_1_3e7e3a60b846 | [2019-10-17T11:13:11.144] [DEBUG] rpc - -------------To Chathub ActionReply: SearchContact cost [1ms]--------
mac001_1_3e7e3a60b846 | [2019-10-17T11:13:11.144] [DEBUG] rpc - event body:
mac001_1_3e7e3a60b846 | [2019-10-17T11:13:11.144] [DEBUG] rpc - {"actionRequestId":"92c8d108-4cd8-4d28-8a37-c87f04c190f1","actionType":"SearchContact","body":"{\"userId\":\"wxid_eweiw7lkmr4n22\"}"}
mac001_1_3e7e3a60b846 | [2019-10-17T11:13:11.144] [DEBUG] rpc - event response:
mac001_1_3e7e3a60b846 | [2019-10-17T11:13:11.144] [DEBUG] rpc - {"alias":"","avatar":"","city":"","friend":false,"gender":0,"id":"wxid_eweiw7lkmr4n22","name":"邱瑞文","province":"","signature":"","type":1,"weixin":"wxid_eweiw7lkmr4n22"}
mac001_1_3e7e3a60b846 | [2019-10-17T11:13:11.144] [DEBUG] rpc - ---------------To Chathub ActionReply: SearchContact cost [1ms]--------


 * 
 * 
 */