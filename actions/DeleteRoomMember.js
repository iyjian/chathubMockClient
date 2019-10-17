/**
 * 
 * {
 * 	 "actionRequestId": "efb8329a-5761-48a7-9559-b239ad2be4ec",
 *	"actionType": "DeleteRoomMember",
 *	"body": "{\"groupId\":\"22311552710@chatroom\",\"userId\":\"wxid_5753727547512\"}"
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
 *mac001_1_3e7e3a60b846 | [2019-10-17T12:07:03.829] [DEBUG] rpc - -------------To Chathub ActionReply: DeleteRoomMember cost [4ms]--------
mac001_1_3e7e3a60b846 | [2019-10-17T12:07:03.829] [DEBUG] rpc - event body:
mac001_1_3e7e3a60b846 | [2019-10-17T12:07:03.829] [DEBUG] rpc - {"actionRequestId":"efb8329a-5761-48a7-9559-b239ad2be4ec","actionType":"DeleteRoomMember","body":"{\"groupId\":\"22311552710@chatroom\",\"userId\":\"wxid_5753727547512\"}"}
mac001_1_3e7e3a60b846 | [2019-10-17T12:07:03.829] [DEBUG] rpc - event response:
mac001_1_3e7e3a60b846 | [2019-10-17T12:07:03.829] [DEBUG] rpc - undefined
mac001_1_3e7e3a60b846 | [2019-10-17T12:07:03.830] [DEBUG] rpc - ---------------To Chathub ActionReply: DeleteRoomMember cost [4ms]--------

 * 
 * 
 */