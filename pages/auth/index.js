var AppUrl = getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        // 如果以下参数成立则代表已授权过
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              // 获取上次授权时间-如果超过12小时则重新授权
              wx.getStorage({
                key: 'curTime',
                success: function(ref) {
                  // 获取上次授权的时间戳
                  var lastTime = ref.data
                  // 获取当前时间戳
                  var timestamp = Date.parse(new Date());
                  // 得到上次授权12小时之后的时间戳
                  var twelveTime = lastTime + 43200000
                  // 把上次授权的时间戳和当前得到的时间戳进行对比-如果超过12小时则重新授权
                  if (timestamp < twelveTime) {
                    //用户已经授权过且距离上次授权未超过12小时则跳转到首页
                    wx.switchTab({
                      url: '/pages/index/index'
                    })
                  } else {
                    // 清理所有的本地授权
                    wx.clearStorage()
                  }
                },
              })
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    var userInfo = e.detail.userInfo
    // 如果以下条件成长则代表用户按了允许授权按钮
    if (userInfo) {
      var that = this
      wx.login({
        success: function(res) {
          // 拼装请求所需参数
          var params = {
            // 请求方法名
            action: 'login',
            // 请求参数
            requestParam: {
              code: res.code
            }
          }
          // 请求参数组合
          const newparams = Object.assign(params);
          wx.request({
            url: AppUrl.globalData.assembleUrl,
            data: newparams,
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: 'post',
            success: function(res) {
              // 请求之后返回的数据值
              var resData = res.data
              // 把用户ID存入本地缓存
              wx.setStorage({
                key: 'userId',
                data: resData.userId,
              })
              // 跳转首页
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          })
        }
      })
      // 获取当前时间戳-然后存入本地缓存
      var timestamp = Date.parse(new Date());
      wx.setStorage({
        key: 'curTime',
        data: timestamp,
      })
      // 把获取到的用户信息存入本地缓存
      wx.setStorage({
        key: "userInfo",
        data: e.detail.userInfo
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告!',
        content: '您点击了拒绝授权，将无法使用部分功能，请授权之后再进入!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
})