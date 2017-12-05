//index.js
//获取应用实例
var util = require('../../utils/util.js');
const app = getApp();

Page({
  // 页面初始数据
  data: {
    // tab切换
   navTab: ["动态","热门","发现"],
  // 设备高度
   windowHeight: 0,
  //  swiper 滑块current值
   currentNavtab: 0,
  //  数据源
   feed: [],
   feed_length: 0,
   hot: [],
   discovery: [],
  //  更多按钮 触发弹窗
   showModalStatus: false ,
   imgUrls: [
      '../../images/24213.jpg',
      '../../images/24280.jpg',
      '../../images/1444983318907-_DSC1826.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    discoveryNavigator: [
      {
        'navigateImage': '../../images/answer.png',
        'navigateDesc':'回答'
      },
      {
        'navigateImage': '../../images/video.png',
        'navigateDesc':'视频'
      },
      {
        'navigateImage': '../../images/specialColumn.png',
        'navigateDesc':'专栏'
      },
      {
        'navigateImage': '../../images/collectionFolder.png',
        'navigateDesc':'收藏夹'
      },
      {
        'navigateImage': '../../images/roundTable.png',
        'navigateDesc':'圆桌'
      }
    ]
  },

  search_page: function(){
    wx.navigateTo({
      url: '../search/search'
    });
    console.log("sss");
  },
  // 弹窗触发事件
  powerDrawer: function (e) { 
    console.log(e);
    // console.log(e.currentTarget.dataset.answerid);
    // console.log(e.currentTarget.dataset.questionid);
    console.log(this.data.feed);
    let feed = this.data.feed;
    let answer_id = e.currentTarget.dataset.answerid;
    // let question_id = e.currentTarget.dataset.questionid;
    let currentStatu = e.currentTarget.dataset.statu; 
    console.log(111);
    console.log(feed); 
    for(let key of feed)  
    {
      if(key.answer_id === answer_id){
        console.log(key.isSelected);
        console.log("sss ");
        key.isSelected = true;  
      }
    } 
    console.log(feed);
    this.setData({
      feed:feed,  
    });
    // const centity = feed.filter((item) => {
    //   return answer_id == item.answer_id
    // });
    // console.log(centity);
    // console.log(centity[0].answer_id);
    // let count = [];
    // const name = feed.map(item =>{
    //   // return item.answer_id;
    //   return count.push(item.answer_id);
    // });
    // console.log(count);
    // count.map((item2)=>{
    //   if(answer_id == item2){
        
    //   }
    // });
    this.util(currentStatu);
    // if(answer_id == centity[0].answer_id){
      // this.util(currentStatu); 
    // }
   
    // console.log(currentStatu);
  },
  // 点击 弹窗关闭
  hide : function(){
    var feed = this.data.feed;
    for(let key of feed){
      key.isSelected = false;
    }
    this.setData({
      feed:feed,
      showModalStatus: false ,
    });
  },

  // 更多按钮 弹窗
  util: function(currentStatu){
    /* 动画部分 */ 
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({ 
      duration: 200,  //动画时长  
      timingFunction: "linear", //动画效果线性  
      delay: 0  //0则不延迟  
    });  
    // console.log(this.animation);
    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;  
    // console.log(this);
    console.log(this.animation);
    // 第3步：执行第一组动画  
    // 调用step()来表示一组动画完成
    animation.opacity(0).rotateX(-100).step();  
   
    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({ 
      // 动画实例的export()方法导出动画数据传递给组件的animation属性
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
    console.log(options);
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
    var hot_data = feed.hot;
    console.log(hot_data);
    var discovery_data = feed.discovery;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length,
      hot: hot_data,
      discovery: discovery_data
    });
  },
  // 点击tab值，swiper发生变化
  clickTab: function(e){
    console.log(e);
    var index = e.target.dataset.idx;
    this.setData({
      currentNavtab: index
    })
  },
  // 滑动swiper，tab值发生变化
  swiperTab: function(e){
    console.log(e);
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
  questionDetailTap: function(e){
    console.log(e);
    let question_id = e.currentTarget.dataset.questionid;
    console.log(question_id);
    console.log(`/pages/questionDetail/questionDetail?question_id=${question_id}`);
     wx.navigateTo({
      url: `/pages/questionDetail/questionDetail?question_id=${question_id}`
    })
  },
  // 评论页面跳转
  commentTap: function(e){
    let question_id = e.currentTarget.dataset.questionid;
     wx.navigateTo({
      url: `/pages/comment/comment?question_id=${question_id}`
    })
  },
  followQuestion: function(e){
    console.log(e);
    let question_id = e.currentTarget.dataset.questionid;
    console.log(question_id);
    let feed = this.data.feed;
    console.log(feed);

    for(let key of feed){
      if(question_id == key.question_id){
        console.log(key.question_id);
        if(key.follow == '已关注'){
          key.follow = '关注问题';
        }else{
          key.follow = '已关注';
        }
      }
    }
    this.setData({
        feed: feed,
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
