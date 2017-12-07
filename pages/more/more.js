// pages/more/more.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    personalInfo:{
      first: [{
        'icon': '../../images/create.png',
        'desc': '我的创作'
      },{
        'icon': '../../images/collectionFolder.png',
        'desc': '我的收藏'
      },{
        'icon': '../../images/follow.png',
        'desc': '我的关注'
      }],
      second: [{
        'icon': '../../images/purchasedContent.png',
        'desc': '已购内容'
      },{
        'icon': '../../images/bookshelf.png',
        'desc': '我的书架'
      },{
        'icon': '../../images/payConsultation.png',
        'desc': '我的付费咨询'
      },{
        'icon': '../../images/balance.png',
        'desc': '我的余额'
      },{
        'icon': '../../images/coupon.png',
        'desc': '我的礼券'
      }],
      third: [{
        'icon': '../../images/recentlyBrowse.png',
        'desc': '最近浏览'
      },{
        'icon': '../../images/nocturnalPattern.png',
        'desc': '夜间模式'
      },{
        'icon': '../../images/helpCenter.png',
        'desc': '反馈帮助中心'
      },{
        'icon': '../../images/setUp.png',
        'desc': '设置'
      }]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
     if (!app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})