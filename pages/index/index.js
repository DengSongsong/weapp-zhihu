//index.js
//获取应用实例
const app = getApp()

Page({
  // 页面初始数据
  data: {
    // tab切换
   navTab: ["动态","热门","发现"],
  // 设备高度
   windowHeight: 0,
   currentNavtab: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    // 小程序来自微信API
    // 硬件和软件系统的基本信息
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight
        });
      }
    })
  },
  // 点击tab值，swiper发生变化
  clickTab: function(e){
    // console.log(e);
    var index = e.target.dataset.idx;
    this.setData({
      currentNavtab: index
    })
  },
  // 滑动swiper，tab值发生变化
  swiperTab: function(e){
    // console.log(e);
    this.setData({
      currentNavtab: e.detail.current
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
