/**
 * 
 * {
 *  "actionRequestId": "097507fd-1594-4bbb-927b-ffbeeca4fc4b",
 *	"actionType": "SetRoomAnnouncement",
 *	"body": "{\"content\":\"需要大家共同维护\",\"groupId\":\"24040137418@chatroom\"}"
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
 * mac001_1_3e7e3a60b846 | [2019-10-17T11:50:36.529] [DEBUG] rpc - -------------To Chathub ActionReply: SetRoomAnnouncement cost [692ms]--------
   mac001_1_3e7e3a60b846 | [2019-10-17T11:50:36.529] [DEBUG] rpc - event body:
   mac001_1_3e7e3a60b846 | [2019-10-17T11:50:36.529] [DEBUG] rpc - {"actionRequestId":"1b4d4a19-6c48-4b73-9f26-86fbdb72d26d","actionType":"SetRoomAnnouncement","body":"{\"content\":\"需要大家共同维护\",\"groupId\":\"22311552710@chatroom\"}"}
   mac001_1_3e7e3a60b846 | [2019-10-17T11:50:36.529] [DEBUG] rpc - event response:
   mac001_1_3e7e3a60b846 | [2019-10-17T11:50:36.531] [DEBUG] rpc - undefined
   mac001_1_3e7e3a60b846 | [2019-10-17T11:50:36.531] [DEBUG] rpc - ---------------To Chathub ActionReply: SetRoomAnnouncement cost [692ms]--------

 * 
 * 
 */