/**
 * 
 * {
 *  "actionRequestId": "6f02e98b-c5ce-498f-998f-994e8a07d1af",
 *  "actionType": "GetRoomQRCode",
 *	"body": "{\"groupId\":\"22311552710@chatroom\"}"
 * }
 * 
 */

module.exports = () => {
  return actionBody => {
    return {}
  }
}

/**
 * 应当看  To Chathub ActionReply 中的 event response 来决定return什么东西
 * 
 mac001_1_3e7e3a60b846 | [2019-10-17T12:01:14.018] [DEBUG] rpc - -------------To Chathub EVENT: ACTIONREPLY----------------
 mac001_1_3e7e3a60b846 | [2019-10-17T12:01:14.018] [DEBUG] rpc - {"eventType":"GetRoomQRCode","body":{"actionRequestId":"6f02e98b-c5ce-498f-998f-994e8a07d1af","actionType":"GetRoomQRCode","body":"{\"groupId\":\"22311552710@chatroom\"}"},"result":{"success":false,"error":"Error: Method not implemented."}}
 ac001_1_3e7e3a60b846 | [2019-10-17T12:01:14.018] [DEBUG] rpc - ---------------To Chathub EVENT: ACTIONREPLY----------------

 * 
 * 
 */