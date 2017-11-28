//index.js
//获取应用实例
var util = require('../../utils/util.js');
const app = getApp()

Page({
  // 页面初始数据
  data: {
    // tab切换
   navTab: ["动态","热门","发现"],
  // 设备高度
   windowHeight: 0,
   currentNavtab: 0,
   feed: [],
   feed_length: 0,
   showModalStatus: false 
  },
  powerDrawer: function (e) { 
    // console.log(e);
    var currentStatu = e.currentTarget.dataset.statu;  
    this.util(currentStatu); 
    console.log(currentStatu);
  },
  util: function(currentStatu){
    /* 动画部分 */ 
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({ 
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });  
    // console.log(this.animation);
    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;  
    // console.log(this);
    // console.log(this.animation);
    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();  
   
    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({ 
      animationData: animation.export() 
    }) 
       
    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () { 
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();  
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({ 
        animationData: animation  
      }) 
         
      //关闭  
      if (currentStatu == "close") { 
        this.setData( 
          { 
            showModalStatus: false 
          } 
        );  
      } 
    }.bind(this), 200) 
     
    // 显示  
    if (currentStatu == "open") { 
      this.setData( 
        { 
          showModalStatus: true 
        } 
      );  
    } 
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
    this.getData();
  },
  // 首页数据展示
  getData: function(){
    var feed = util.getData2();
    console.log(feed);
    var feed_data = feed.data;
    console.log(feed_data);
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
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
  // 下拉刷新
  lower: function(){
    // 在当前页面显示导航条加载动画
    wx.showNavigationBarLoading();
    setTimeout(() => {
      // 在当前页面隐藏导航条加载动画
      wx.hideNavigationBarLoading();
      this.nextLoad();
    },1000)
  },
  // 下来显示新内容
  nextLoad: function(){
     // 消息提示框
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 4000
    })
    var next = util.getNext();
    // console.log(next);
    var next_data = next.data;
    // console.log(next_data);
    // console.log(this.data);
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    })
    setTimeout(() => {
      wx.showToast({
        title: '加载成功',
        icon: 'success',
        duration: 1000
      })
    },3000)
  },
  // 上滚刷新
  upper: function(){
    wx.showNavigationBarLoading();
    this.refresh();
    setTimeout(() => {
      wx.hideNavigationBarLoading();
      // 停止下拉刷新
      wx.stopPullDownRefresh();
    },2000)
  },
  refresh: function(){
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 2000
    });
    var feed = util.getData2();
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    })
    setTimeout(() => {
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      })
    },3000)
  },
  // 回答详情页面跳转
  bindItemTap: function(e){
    console.log(e);
    let answer_id = e.currentTarget.dataset.answerid;
    console.log(answer_id);
    console.log(`/pages/answer/answer?answer_id=${answer_id}`);
    wx.navigateTo({
      url: `/pages/answer/answer?answer_id=${answer_id}`
    })

  },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
