//app.js  
var fundebug = require('./libs/fundebug.1.0.0.min.js');
fundebug.init({
  apikey: 'deabe72389b9701e9f0f6eb912074bb4cd107df3b32c88a1748df82b2a04e75b'
})
App({
  onLaunch: function() {
    var that = this;
    // 跳转授权页面
  },
  globalData: {
    // 标识ID
    bis_id: '34',
    // appid
    appid: "wx8c46c7f8d8f32979",
    // 密钥
    secret: "07a820b78e847f0bcad60af0d364c67e",
    // 请求地址
    assembleUrl: 'http://47.93.254.104:8080/qingCong/index',
  }
})