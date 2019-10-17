/**
 * 
 * {
 *	  "actionRequestId": "980806c7-5e7b-435d-ba3c-6a6772269237",
 *    "actionType": "SendAppMessage",
 *	  "body": "{\"content\":{\"msg\":{\"appinfo\":{\"appname\":\"\",\"version\":\"1\"},\"appmsg\":{\"$\":{\"appid\":\"\",\"sdkver\":\"0\"},\"action\":\"view\",\"appattach\":{\"aeskey\":\"\",\"attachid\":\"\",\"cdnthumbaeskey\":\"\",\"emoticonmd5\":\"\",\"fileext\":\"\",\"totallen\":\"0\"},\"content\":\"\",\"contentattr\":\"0\",\"dataurl\":\"\",\"des\":\"七夕小程序折扣大放送！\",\"extinfo\":\"\",\"lowdataurl\":\"\",\"lowurl\":\"\",\"md5\":\"\",\"mediatagname\":\"\",\"messageaction\":\"\",\"messageext\":\"\",\"mmreadershare\":{\"duration\":\"0\",\"funcflag\":\"0\",\"height\":\"0\",\"itemshowtype\":\"0\",\"nativepage\":\"0\",\"pubtime\":\"0\",\"vid\":\"\",\"width\":\"0\"},\"showtype\":\"0\",\"songalbumurl\":\"\",\"songlyric\":\"\",\"soundtype\":\"0\",\"sourcedisplayname\":\"\",\"sourceusername\":\"\",\"statextstr\":\"\",\"thumburl\":\"https://mmbiz.qlogo.cn/mmbiz_jpg/5B3QI1cpb3BHPtAuc4PVYId4XAN6JyoWWJLNZmy3JXLqYPcYtHUVIHoIcf3pVG19tSL469JjDk8nL3uBibrGXqQ/300?wx_fmt=jpeg\\u0026wxfrom=1\",\"title\":\"WHAT？纪梵希小羊皮77元？冲鸭！七夕宠爱大放送！（页尾领礼物）\",\"type\":\"5\",\"url\":\"http://mp.weixin.qq.com/s?__biz=Mzg3NzE2Mjk1MA==\\u0026mid=2247484083\\u0026idx=1\\u0026sn=0634f56f530b99a035d15e6f2d108e6a\\u0026chksm=cf267a1af851f30ccf40c0337f459f9e34ae3ed7fd73469a12ba0545058b744b59cef4ea9cef\\u0026mpshare=1\\u0026scene=1\\u0026srcid=\\u0026sharer_sharetime=1565257807935\\u0026sharer_shareid=89a26ff4dc124cabecf7ca23b418bdc6#rd\"},\"commenturl\":\"\",\"fromusername\":\"wxid_b7rvs8pdawnu21\",\"scene\":\"0\"}},\"toUserName\":\"wxid_5753727547512\"}"
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
 * mac001_1_3e7e3a60b846 | [2019-10-17T11:20:04.791] [DEBUG] rpc - -------------To Chathub ActionReply: SendAppMessage cost [4ms]--------
    mac001_1_3e7e3a60b846 | [2019-10-17T11:20:04.791] [DEBUG] rpc - event body:
   mac001_1_3e7e3a60b846 | [2019-10-17T11:20:04.791] [DEBUG] rpc - {"actionRequestId":"980806c7-5e7b-435d-ba3c-6a6772269237","actionType":"SendAppMessage","body":"{\"content\":{\"msg\":{\"appinfo\":{\"appname\":\"\",\"version\":\"1\"},\"appmsg\":{\"$\":{\"appid\":\"\",\"sdkver\":\"0\"},\"action\":\"view\",\"appattach\":{\"aeskey\":\"\",\"attachid\":\"\",\"cdnthumbaeskey\":\"\",\"emoticonmd5\":\"\",\"fileext\":\"\",\"totallen\":\"0\"},\"content\":\"\",\"contentattr\":\"0\",\"dataurl\":\"\",\"des\":\"七夕小程序折扣大放送！\",\"extinfo\":\"\",\"lowdataurl\":\"\",\"lowurl\":\"\",\"md5\":\"\",\"mediatagname\":\"\",\"messageaction\":\"\",\"messageext\":\"\",\"mmreadershare\":{\"duration\":\"0\",\"funcflag\":\"0\",\"height\":\"0\",\"itemshowtype\":\"0\",\"nativepage\":\"0\",\"pubtime\":\"0\",\"vid\":\"\",\"width\":\"0\"},\"showtype\":\"0\",\"songalbumurl\":\"\",\"songlyric\":\"\",\"soundtype\":\"0\",\"sourcedisplayname\":\"\",\"sourceusername\":\"\",\"statextstr\":\"\",\"thumburl\":\"https://mmbiz.qlogo.cn/mmbiz_jpg/5B3QI1cpb3BHPtAuc4PVYId4XAN6JyoWWJLNZmy3JXLqYPcYtHUVIHoIcf3pVG19tSL469JjDk8nL3uBibrGXqQ/300?wx_fmt=jpeg\\u0026wxfrom=1\",\"title\":\"WHAT？纪梵希小羊皮77元？冲鸭！七夕宠爱大放送！（页尾领礼物）\",\"type\":\"5\",\"url\":\"http://mp.weixin.qq.com/s?__biz=Mzg3NzE2Mjk1MA==\\u0026mid=2247484083\\u0026idx=1\\u0026sn=0634f56f530b99a035d15e6f2d108e6a\\u0026chksm=cf267a1af851f30ccf40c0337f459f9e34ae3ed7fd73469a12ba0545058b744b59cef4ea9cef\\u0026mpshare=1\\u0026scene=1\\u0026srcid=\\u0026sharer_sharetime=1565257807935\\u0026sharer_shareid=89a26ff4dc124cabecf7ca23b418bdc6#rd\"},\"commenturl\":\"\",\"fromusername\":\"wxid_b7rvs8pdawnu21\",\"scene\":\"0\"}},\"toUserName\":\"wxid_5753727547512\"}"}
   mac001_1_3e7e3a60b846 | [2019-10-17T11:20:04.792] [DEBUG] rpc - event response:
   mac001_1_3e7e3a60b846 | [2019-10-17T11:20:04.792] [DEBUG] rpc - undefined
   mac001_1_3e7e3a60b846 | [2019-10-17T11:20:04.793] [DEBUG] rpc - ---------------To Chathub ActionReply: SendAppMessage cost [4ms]--------
 * 
 * 
 */