//index.js
//获取应用实例
var AppUrl = getApp()
Page({
  data: {
    // 轮播图
    imgUrl: '',
    // 是否出现下拉加载状态loding
    hidden: true,
    // 距离头部
    scrollTop: 0,
    // 轮播图片
    recommend_pics: [],
    
    // 商品列表
    recommend_info:[{
      thumb: '/image/index/banner_1.jpg',
      p_name:'10',
      associator_price:'10',
      pintuan_count:'10',
      pintuan_price:'10'
    },
    {
      thumb: '/image/index/banner_2.jpg',
      p_name:'10',
      associator_price:'10',
      pintuan_count:'10',
      pintuan_price:'10'
    },
      {
        thumb: '/image/index/banner_3.jpg',
        p_name: '10',
        associator_price: '10',
        pintuan_count: '10',
        pintuan_price: '10'
      }
   
    ],
  },
  // SMZQ生命周期钩子函数 监听页面初次加载
  onLoad: function(options) {
    // 重定向this指向，预防回调函数改变this问题
    var _this = this;
    // 获取本地缓存内的UserId信息
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        // 把user_id存入本地data数据
        _this.setData({
          user_id: res.data,
        })
      },
    })
    // 获取高度
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  // SMZQ生命周期钩子函数 监听页面初次渲染完成
  onReady: function() {
    // 加载banner图
    this.bannerRep()
    // 请求商品列表
    this.infoReq()
  },
  // 请求首页banner图
  bannerRep: function() {
    var that = this
    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'getAdvertByState',
      // 请求参数
      requestParam: {
        userId: that.data.user_id
      }
    }
    // 请求参数组合
    const newparams = Object.assign(params);
    wx.request({
      url: AppUrl.globalData.assembleUrl,
      data: newparams,
      method: 'post',
      header: {
        'content-type': ''
      },
      success: function(res) {
      //  把获取到的数据存入data
        that.setData({
          recommend_pics: res.data
        })
      }
    })
  },
  // 请求商品列表函数
  infoReq: function() {
    var that = this
    // 拼装请求所需参数
    var params = {
      // 请求方法名
      action: 'getIndexGoodsByVolume',
      // 请求参数
      requestParam: {
        userId: that.data.user_id
      }
    }
    // 请求参数组合
    const newparams = Object.assign(params);
    //推荐商品列表
    wx.request({
      url: AppUrl.globalData.assembleUrl,
      data: newparams,
      method: 'post',
      header: {
        'content-type': ''
      },
      success: function(res) {
        console.log(res)
        that.setData({
          recommend_info: res.data.result,
          hasMore: res.data.has_more,
          page: 1
        })
      }
    })
  },



  //获取详情
  // getProDetail: function(event){
  //   var pro_id = event.currentTarget.dataset.proid;
  //   wx.navigateTo({
  //     url: '/pages/index/pro_detail/pro_detail?pro_id='+pro_id,
  //   })
  // },
  //下拉刷新
  topLoad: function() {
    var that = this
    var bis_id = AppUrl.globalData.bis_id
    wx.showNavigationBarLoading()
    wx.request({
        url: AppUrl.globalData.requestUrl + '/index/getBannersInfo',
        data: {
          bis_id: bis_id
        },
        header: {
          'content-type': ''
        },
        success: function(res) {
          that.setData({
            recommend_pics: res.data.result
          })
        }
      }),
      //推荐商品列表
      wx.request({
        url: AppUrl.globalData.requestUrl + '/index/getRecProByGroup',
        data: {
          bis_id: bis_id
        },
        header: {
          'content-type': ''
        },
        method: 'post',
        success: function(res) {
          that.setData({
            recommend_info: res.data.result,
            hasMore: res.data.has_more,
            page: 1
          })
        },
        complete: function() {
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }
      })
  },
  //分享
  onShareAppMessage: function() {
    return {
      title: '轻商拼团，小程序技术。自由拼、快速拼！',
      path: '/pages/index/index'
    }
  },
  //页面滑动到底部
  bindDownLoad: function() {
    var that = this;
    that.loadMore()
  },
  scroll: function(event) {
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      crollTop: event.detail.scrollTop
    });
  },
  //加载更多
  loadMore: function(e) {
    var that = this
    var bis_id = AppUrl.globalData.bis_id
    that.setData({
      hidden: false
    });
    var page = that.data.page
    page++
    var url = AppUrl.globalData.requestUrl + '/index/getRecProByGroup'
    var postData = {
      bis_id: bis_id,
      page: page
    }
    if (that.data.hasMore == true) {
      that.setData({
        hasMore: false
      })
      wx.request({
        url: url,
        data: postData,
        header: {
          'content-type': ''
        },
        method: 'post',
        success: function(res) {
          var list = that.data.recommend_info;
          if (res.data.statuscode == 1) {
            for (var i = 0; i < res.data.result.length; i++) {
              list.push(res.data.result[i]);
            }
            that.setData({
              recommend_info: list,
              page: page,
              hidden: true,
              hasMore: res.data.has_more
            });
          } else {
            that.setData({
              recommend_info: list,
              hidden: false,
              hasMore: false
            });
          }
        }
      });
    } else {
      that.setData({
        hidden: true
      });
    }
  },
})