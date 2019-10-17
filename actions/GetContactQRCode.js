/**
 * 
 * {
 *	"actionRequestId": "ca524a17-5c55-406f-a263-e68fab27d4ee",
 *	"actionType": "GetContactQRCode",
 *	"body": "{\"style\":0,\"userId\":\"wxid_5753727547512\"}"
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
mac001_1_3e7e3a60b846 | [2019-10-17T16:04:21.436] [DEBUG] rpc - -------------To Chathub EVENT: ACTIONREPLY----------------
mac001_1_3e7e3a60b846 | [2019-10-17T16:04:21.436] [DEBUG] rpc - {"eventType":"GetContactQRCode","body":{"actionRequestId":"ca524a17-5c55-406f-a263-e68fab27d4ee","actionType":"GetContactQRCode","body":"{\"style\":0,\"userId\":\"wxid_5753727547512\"}"},"result":{"success":false,"error":"Error: Method not implemented."}}
mac001_1_3e7e3a60b846 | [2019-10-17T16:04:21.436] [DEBUG] rpc - ---------------To Chathub EVENT: ACTIONREPLY----------------

 * 
 * 
 */