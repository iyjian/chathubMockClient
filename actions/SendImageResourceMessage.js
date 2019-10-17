/**
 * 
 * {
 *	"actionRequestId": "c146ad66-fc9f-4ab0-8c7a-d411f9e1b833",
 *  "actionType": "SendImageResourceMessage",
 *	"body": "{\"imageId\":\"wxid_v3t1we1k343112-1fcbd10d-2f59-493e-a127-78679f1f15ec.jpg\",\"toUserName\":\"wxid_5753727547512\"}"
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
 * [36mmac001_1_3e7e3a60b846 |[0m [36m[2019-10-17T10:06:56.695] [DEBUG] rpc - [39m-------------To Chathub ActionReply: SendTextMessage cost [272ms]--------
   [36mmac001_1_3e7e3a60b846 |[0m [36m[2019-10-17T10:06:56.696] [DEBUG] rpc - [39mevent body:
   [36mmac001_1_3e7e3a60b846 |[0m [36m[2019-10-17T10:06:56.696] [DEBUG] rpc - [39m{"actionRequestId":"5e21ee19-5457-4c1c-a19f-5e466d0c6340","actionType":"SendTextMessage","body":"{\"atList\":[],\"content\":\"你好呀，小怪兽\",\"toUserName\":\"wxid_5753727547512\"}"}
   [36mmac001_1_3e7e3a60b846 |[0m [36m[2019-10-17T10:06:56.696] [DEBUG] rpc - [39m] event response:
   [36mmac001_1_3e7e3a60b846 |[0m [36m[2019-10-17T10:06:56.697] [DEBUG] rpc - [39m] undefined
   [36mmac001_1_3e7e3a60b846 |[0m [36m[2019-10-17T10:06:56.697] [DEBUG] rpc - [39m---------------To Chathub ActionReply: SendTextMessage cost [272ms]--------
 * 
 * 
 */