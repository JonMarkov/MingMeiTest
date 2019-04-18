//app.js  
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