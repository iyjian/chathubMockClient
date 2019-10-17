/**
 * 
 *{
 *	 "actionRequestId": "0bf51052-071f-4b20-aa42-112eaa9634e4",
 *	 "actionType": "GetRoomMembers",
 *	 "body": "{\"groupId\":\"24040137418@chatroom\"}"
*}
 * 
 */

module.exports = () => {
  return actionBody => {
    return []
  }
}

/**
 * 应当看  To Chathub ActionReply 中的 event response 来决定return什么东西
 * 
mac001_1_3e7e3a60b846 | [2019-10-17T11:42:19.455] [DEBUG] rpc - -------------To Chathub ActionReply: GetRoomMembers cost [2ms]--------
mac001_1_3e7e3a60b846 | [2019-10-17T11:42:19.455] [DEBUG] rpc - event body:
mac001_1_3e7e3a60b846 | [2019-10-17T11:42:19.455] [DEBUG] rpc - {"actionRequestId":"0bf51052-071f-4b20-aa42-112eaa9634e4","actionType":"GetRoomMembers","body":"{\"groupId\":\"24040137418@chatroom\"}"}
mac001_1_3e7e3a60b846 | [2019-10-17T11:42:19.455] [DEBUG] rpc - event response:
mac001_1_3e7e3a60b846 | [2019-10-17T11:42:19.455] [DEBUG] rpc - []
mac001_1_3e7e3a60b846 | [2019-10-17T11:42:19.455] [DEBUG] rpc - ---------------To Chathub ActionReply: GetRoomMembers cost [2ms]--------

 * 
 * 
 */