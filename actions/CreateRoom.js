/**
 * 
 * {
 *   "actionRequestId": "a9ea556e-52f0-47bf-b285-eb85fbaed473",
 *   "actionType": "CreateRoom",
   	 "body": "{\"userList\":[\"wxid_7pbpilnzjbhp21\",\"wxid_ffk05mmvo73s22\",\"wxid_v3t1we1k343112\"]}"
 * }
 * 
 */

module.exports = () => {
  return actionBody => {
    return  {
      "userName": "24040137418@chatroom",
      "status": 0
    }

  }
}


/**
 * 应当看  To Chathub ActionReply 中的 event response 来决定return什么东西
 * 
 * mac002_1_35ccd4b3946b | [2019-10-17T11:33:16.606] [DEBUG] rpc - -------------To Chathub ActionReply: CreateRoom cost [1576ms]--------
   mac002_1_35ccd4b3946b | [2019-10-17T11:33:16.606] [DEBUG] rpc - event body:
   mac002_1_35ccd4b3946b | [2019-10-17T11:33:16.606] [DEBUG] rpc - {"actionRequestId":"a9ea556e-52f0-47bf-b285-eb85fbaed473","actionType":"CreateRoom","body":"{\"userList\":[\"wxid_7pbpilnzjbhp21\",\"wxid_ffk05mmvo73s22\",\"wxid_v3t1we1k343112\"]}"}
   mac002_1_35ccd4b3946b | [2019-10-17T11:33:16.606] [DEBUG] rpc - event response:
   mac002_1_35ccd4b3946b | [2019-10-17T11:33:16.607] [DEBUG] rpc - {"userName":"24040137418@chatroom","status":0}
   mac002_1_35ccd4b3946b | [2019-10-17T11:33:16.607] [DEBUG] rpc - ---------------To Chathub ActionReply: CreateRoom cost [1576ms]--------

 * 
 * 
 */
