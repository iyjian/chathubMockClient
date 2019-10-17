/**
 * 
 *{
 *	 "actionRequestId": "0bf51052-071f-4b20-aa42-112eaa9634e4",
 *	 "actionType": "GetRoomMembers",
 *	 "body": "{\"groupId\":\"22311552710@chatroom\"}"
*}
 * 
 */

module.exports = () => {
  return actionBody => {
    return [
      {
        "alias": "",
        "avatar": "http://wx.qlogo.cn/mmhead/ver_1/l4S4P29T7caATejPjQ8dncBjdAKmv6TFubV2GGn8TuM61s3EZicJiaNJTFQicjPQjPXKkcHia3hq2YHCXhVPjqFFUahKB1fm1cPde4htmicvT4xs/132",
        "city": "Taizhou",
        "friend": true,
        "gender": 1,
        "id": "wxid_7pbpilnzjbhp21",
        "name": "斩月",
        "province": "Jiangsu",
        "signature": "",
        "type": 1,
        "weixin": "wxid_7pbpilnzjbhp21"
      },
      {
        "alias": "",
        "avatar": "http://wx.qlogo.cn/mmhead/ver_1/IUnab5WKQmV8d6KDicjic99arLdIvWmlGxFk8xBSOeeTLJxvLIpELibECPPEuQtT9TCgEAN7CcXDB0faWSrPCJq0oslUibahjzeDjWcojtlkk48/132",
        "city": "Yangyang",
        "friend": true,
        "gender": 1,
        "id": "wxid_ffk05mmvo73s22",
        "name": "人在江湖漂",
        "province": "Hubei",
        "signature": "",
        "type": 1,
        "weixin": "wxid_ffk05mmvo73s22"
      },
      {
        "alias": "",
        "avatar": "http://wx.qlogo.cn/mmhead/ver_1/LlTkNYDmMicp5TWgTcgP9x9sylDKCLJxC3jznvy2NFNSZX08micNYkYDHUbSicEOc2hKhA4ibZPkMBXeMk2ic3vo6u8gCOecA2U8rzytibZxzWrgk/0",
        "city": "",
        "friend": false,
        "gender": 0,
        "id": "wxid_v3t1we1k343112",
        "name": "微微",
        "province": "",
        "signature": "",
        "type": 1,
        "weixin": "wxid_v3t1we1k343112"
      }
    ]
  }
}

/**
 * 应当看  To Chathub ActionReply 中的 event response 来决定return什么东西
 * 
mac001_1_3e7e3a60b846 | [2019-10-17T12:03:56.096] [DEBUG] rpc - -------------To Chathub ActionReply: GetRoomMembers cost [3ms]--------
mac001_1_3e7e3a60b846 | [2019-10-17T12:03:56.098] [DEBUG] rpc - event body:
mac001_1_3e7e3a60b846 | [2019-10-17T12:03:56.098] [DEBUG] rpc - {"actionRequestId":"2943e9a0-2bc2-4b79-b9d1-cb7af7e2a6ca","actionType":"GetRoomMembers","body":"{\"groupId\":\"22311552710@chatroom\"}"}
mac001_1_3e7e3a60b846 | [2019-10-17T12:03:56.098] [DEBUG] rpc - event response:
mac001_1_3e7e3a60b846 | [2019-10-17T12:03:56.099] [DEBUG] rpc - [{"alias":"","avatar":"http://wx.qlogo.cn/mmhead/ver_1/l4S4P29T7caATejPjQ8dncBjdAKmv6TFubV2GGn8TuM61s3EZicJiaNJTFQicjPQjPXKkcHia3hq2YHCXhVPjqFFUahKB1fm1cPde4htmicvT4xs/132","city":"Taizhou","friend":true,"gender":1,"id":"wxid_7pbpilnzjbhp21","name":"斩月","province":"Jiangsu","signature":"","type":1,"weixin":"wxid_7pbpilnzjbhp21"},{"alias":"","avatar":"http://wx.qlogo.cn/mmhead/ver_1/IUnab5WKQmV8d6KDicjic99arLdIvWmlGxFk8xBSOeeTLJxvLIpELibECPPEuQtT9TCgEAN7CcXDB0faWSrPCJq0oslUibahjzeDjWcojtlkk48/132","city":"Yangyang","friend":true,"gender":1,"id":"wxid_ffk05mmvo73s22","name":"人在江湖漂","province":"Hubei","signature":"","type":1,"weixin":"wxid_ffk05mmvo73s22"},{"alias":"","avatar":"http://wx.qlogo.cn/mmhead/ver_1/LlTkNYDmMicp5TWgTcgP9x9sylDKCLJxC3jznvy2NFNSZX08micNYkYDHUbSicEOc2hKhA4ibZPkMBXeMk2ic3vo6u8gCOecA2U8rzytibZxzWrgk/0","city":"","friend":false,"gender":0,"id":"wxid_v3t1we1k343112","name":"微微","province":"","signature":"","type":1,"weixin":"wxid_v3t1we1k343112"}]
mac001_1_3e7e3a60b846 | [2019-10-17T12:03:56.099] [DEBUG] rpc - ---------------To Chathub ActionReply: GetRoomMembers cost [3ms]--------

 * 
 * 
 */