/**
 * 
 * {
 *   "actionRequestId": "1229acaa-8077-4e91-a2ab-bc0bd5835c59",
 *	 "actionType": "AddRoomMember",
 *   "body": "{\"groupId\":\"24040137418@chatroom\",\"userId\":\"wxid_5753727547512\"}"
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
 * mac001_1_3e7e3a60b846 | [2019-10-17T11:38:49.059] [DEBUG] rpc - -------------To Chathub ActionReply: AddRoomMember cost [37ms]--------
   mac001_1_3e7e3a60b846 | [2019-10-17T11:38:49.059] [DEBUG] rpc - event body:
   mac001_1_3e7e3a60b846 | [2019-10-17T11:38:49.059] [DEBUG] rpc - {"actionRequestId":"1229acaa-8077-4e91-a2ab-bc0bd5835c59","actionType":"AddRoomMember","body":"{\"groupId\":\"24040137418@chatroom\",\"userId\":\"wxid_5753727547512\"}"}
   mac001_1_3e7e3a60b846 | [2019-10-17T11:38:49.059] [DEBUG] rpc - event response:
   mac001_1_3e7e3a60b846 | [2019-10-17T11:38:49.059] [DEBUG] rpc - undefined
   mac001_1_3e7e3a60b846 | [2019-10-17T11:38:49.059] [DEBUG] rpc - ---------------To Chathub ActionReply: AddRoomMember cost [37ms]--------

 * 
 * 
 */
