//app.js
App({
  onLaunch: function () {
    var that = this;
    // 跳转授权页面
  },
  globalData: {
    userInfo: null,
    bis_id : '34',
    appid: "wx8c46c7f8d8f32979",
    secret: "d093df2145cdafcec281cf128dca3880",
    openid : '',
    acode : '',
    rec_id : '',
    //测试
    // imgUrl: "http://mall.dxshuju.com:8000/",
    // requestUrl: "https://wxapp.dxshuju.com/index",
    // acodeUrl: "https://wxapp.dxshuju.com/",
    // payUrl: "https://wxapp.dxshuju.com/index/grouppay/pay",
    //腾讯云正式
    imgUrl: "http://cp.dxshuju.com/",
    requestUrl: "https://xcx001.dxshuju.com/index",
    acodeUrl: "https:// ",
    payUrl: "https://xcx001.dxshuju.com/index/grouppay/pay",
  }
})