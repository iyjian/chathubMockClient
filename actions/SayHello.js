/**
 * 
 * {
 *   "actionRequestId": "98a03dfc-9a50-42d5-9413-d832c65f9fda",
 *   "actionType": "SendTextMessage",
 *   "body": "{\"atList\":[],\"content\":\"Hello\",\"toUserName\":\"wxid_5753727547512\"}"
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
mac001_1_3e7e3a60b846 | [2019-10-17T11:16:40.969] [DEBUG] rpc - -------------To Chathub ActionReply: SendTextMessage cost [258ms]--------
mac001_1_3e7e3a60b846 | [2019-10-17T11:16:40.969] [DEBUG] rpc - event body:
mac001_1_3e7e3a60b846 | [2019-10-17T11:16:40.969] [DEBUG] rpc - {"actionRequestId":"98a03dfc-9a50-42d5-9413-d832c65f9fda","actionType":"SendTextMessage","body":"{\"atList\":[],\"content\":\"Hello\",\"toUserName\":\"wxid_5753727547512\"}"}
mac001_1_3e7e3a60b846 | [2019-10-17T11:16:40.969] [DEBUG] rpc - event response:
mac001_1_3e7e3a60b846 | [2019-10-17T11:16:40.969] [DEBUG] rpc - undefined
mac001_1_3e7e3a60b846 | [2019-10-17T11:16:40.969] [DEBUG] rpc - ---------------To Chathub ActionReply: SendTextMessage cost [258ms]--------


 * 
 * 
 */