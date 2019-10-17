
/**
 * 
 * {
 *    "actionRequestId":"73074811-31ad-4e64-bfd2-e1206decf371",
 *    "actionType":"DeleteContact",
 *    "body":"{\"userId\":\"wxid_eweiw7lkmr4n22\"}"
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
 * mac001_1_3e7e3a60b846 | [2019-10-17T10:51:39.094] [DEBUG] rpc - -------------To Chathub ActionReply: DeleteContact cost [1ms]--------
   mac001_1_3e7e3a60b846 | [2019-10-17T10:51:39.094] [DEBUG] rpc - event body:
   mac001_1_3e7e3a60b846 | [2019-10-17T10:51:39.094] [DEBUG] rpc - {"actionRequestId":"73074811-31ad-4e64-bfd2-e1206decf371","actionType":"DeleteContact","body":"{\"userId\":\"wxid_eweiw7lkmr4n22\"}"}
   mac001_1_3e7e3a60b846 | [2019-10-17T10:51:39.094] [DEBUG] rpc - event response:
   mac001_1_3e7e3a60b846 | [2019-10-17T10:51:39.094] [DEBUG] rpc - undefined
   mac001_1_3e7e3a60b846 | [2019-10-17T10:51:39.094] [DEBUG] rpc - ---------------To Chathub ActionReply: DeleteContact cost [1ms]--------

 * 
 * 
 */