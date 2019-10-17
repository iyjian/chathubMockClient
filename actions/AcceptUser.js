/**
 * 
 * {
 * 	"actionRequestId": "c6732a63-4da1-4c32-b4dc-b3640f08d5d2",
 * 	"actionType": "AcceptUser",
 *	"body": "{\"contactId\":\"wxid_5753727547512\",\"hello\":\"我是小怪兽\",\"id\":\"6089797454690015217\",\"stranger\":\"v1_83d2b83ef9721dfbbf46c444e2fff1ad137e24be1afb23ab801eaf3c8d561c8a21cabdfafbc7af7273eef1a014a7f3c0@stranger\",\"ticket\":\"v2_dd9f6b8f51be63f0ec3947cc388d8d9ef9b5d11debfb995c37eb9e11f011d9aae567feb5ada8e656f072c570666777e7f0f36810ff5fc8f61208c501b67a0993@stranger\",\"timestamp\":1571291408123,\"type\":2}"
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
 * mac002_1_35ccd4b3946b | [2019-10-17T13:52:25.892] [DEBUG] rpc - -------------To Chathub ActionReply: AcceptUser cost [1440ms]--------
mac002_1_35ccd4b3946b | [2019-10-17T13:52:25.892] [DEBUG] rpc - event body:
mac002_1_35ccd4b3946b | [2019-10-17T13:52:25.892] [DEBUG] rpc - {"actionRequestId":"c6732a63-4da1-4c32-b4dc-b3640f08d5d2","actionType":"AcceptUser","body":"{\"contactId\":\"wxid_5753727547512\",\"hello\":\"我是小怪兽\",\"id\":\"6089797454690015217\",\"stranger\":\"v1_83d2b83ef9721dfbbf46c444e2fff1ad137e24be1afb23ab801eaf3c8d561c8a21cabdfafbc7af7273eef1a014a7f3c0@stranger\",\"ticket\":\"v2_dd9f6b8f51be63f0ec3947cc388d8d9ef9b5d11debfb995c37eb9e11f011d9aae567feb5ada8e656f072c570666777e7f0f36810ff5fc8f61208c501b67a0993@stranger\",\"timestamp\":1571291408123,\"type\":2}"}
mac002_1_35ccd4b3946b | [2019-10-17T13:52:25.892] [DEBUG] rpc - event response:
mac002_1_35ccd4b3946b | [2019-10-17T13:52:25.892] [DEBUG] rpc - undefined
mac002_1_35ccd4b3946b | [2019-10-17T13:52:25.892] [DEBUG] rpc - ---------------To Chathub ActionReply: AcceptUser cost [1440ms]--------

 * 
 * 
 */
