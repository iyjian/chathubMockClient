/**
 * 
 * {
 *	"actionRequestId": "f14c03c8-676b-447a-b8fc-2f1363da4030",
 *	"actionType": "InviteRoomMember",
 *	"body": "{\"groupId\":\"11624244887@chatroom\",\"userId\":\"wxid_5753727547512\"}"
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
mac001_1_3e7e3a60b846 | [2019-10-17T11:44:17.458] [DEBUG] rpc - -------------To Chathub ActionReply: InviteRoomMember cost [41ms]--------
mac001_1_3e7e3a60b846 | [2019-10-17T11:44:17.458] [DEBUG] rpc - event body:
mac001_1_3e7e3a60b846 | [2019-10-17T11:44:17.458] [DEBUG] rpc - {"actionRequestId":"f14c03c8-676b-447a-b8fc-2f1363da4030","actionType":"InviteRoomMember","body":"{\"groupId\":\"11624244887@chatroom\",\"userId\":\"wxid_5753727547512\"}"}
mac001_1_3e7e3a60b846 | [2019-10-17T11:44:17.458] [DEBUG] rpc - event response:
mac001_1_3e7e3a60b846 | [2019-10-17T11:44:17.458] [DEBUG] rpc - undefined
mac001_1_3e7e3a60b846 | [2019-10-17T11:44:17.458] [DEBUG] rpc - ---------------To Chathub ActionReply: InviteRoomMember cost [41ms]--------

 * 
 * 
 */