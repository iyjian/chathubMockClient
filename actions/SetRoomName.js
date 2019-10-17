/**
 * 
 * {
 *	"actionRequestId": "040e2f1b-6f7f-44de-86a8-9bb050f4b6dd",
 *  "actionType": "SetRoomName",
 *	"body": "{\"content\":\"test测试群\",\"groupId\":\"22311552710@chatroom\"}"
 * }
 * 
 */

module.exports = () => {
  return actionBody => {
    return undefined
  }
}


/**
 * 应当看  To Chathub ActionReply 中的 event response 来决定return什么东西
 * 
 * mac001_1_3e7e3a60b846 | [2019-10-17T11:53:21.339] [DEBUG] rpc - -------------To Chathub ActionReply: SetRoomName cost [1428ms]--------
mac001_1_3e7e3a60b846 | [2019-10-17T11:53:21.339] [DEBUG] rpc - event body:
mac001_1_3e7e3a60b846 | [2019-10-17T11:53:21.339] [DEBUG] rpc - {"actionRequestId":"040e2f1b-6f7f-44de-86a8-9bb050f4b6dd","actionType":"SetRoomName","body":"{\"content\":\"test测试群\",\"groupId\":\"22311552710@chatroom\"}"}
mac001_1_3e7e3a60b846 | [2019-10-17T11:53:21.339] [DEBUG] rpc - event response:
mac001_1_3e7e3a60b846 | [2019-10-17T11:53:21.339] [DEBUG] rpc - undefined
mac001_1_3e7e3a60b846 | [2019-10-17T11:53:21.339] [DEBUG] rpc - ---------------To Chathub ActionReply: SetRoomName cost [1428ms]--------
 * 
 * 
 */