// pages/answer/answer.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    centity: [],
    flag: 1,
    change:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let answer_id = options.answer_id;
    console.log(answer_id);
    let answer = util.getAnswer().data;
    console.log(answer);
    const centity = answer.filter((answer) => {
      return answer_id == answer.answer_id;
    })
    // console.log(centity);
    this.setData({
      centity: centity,
      
    });
    console.log(centity);
    wx.setNavigationBarTitle({
    title:this.data.centity[0].question
  })
  },

  // 向下滚动 底部导航栏隐藏
  lower: function(){
    this.setData({
      // flag: 0
    })
    // console.log("000");
  },
  // 向上滚动 底部导航栏显示
  upper: function(){
    this.setData({
      // flag:1
    })
    // console.log("111");
  },
  // 点击收藏事件
  collecting: function(){
    console.log(this.data.change);
    if(this.data.change == 1){
      wx.showToast({
      title: '已感谢',
      image: '../../images/love_focus.png',
      duration: 1000
      });
      this.setData({
        change: 0
      })
    }else if(this.data.change == 0){
      wx.showToast({
      title: '已取消',
      image: '../../images/love.png',
      duration: 1000
      });
      this.setData({
        change: 1
      })
    }
   
//     wx.showActionSheet({
//   itemList: ['A', 'B', 'C'],
//   success: function(res) {
//     console.log(res.tapIndex)
//   },
//   fail: function(res) {
//     console.log(res.errMsg)
//   }
// })
//     wx.showModal({
//   title: '提示',
//   content: '这是一个模态弹窗',
//   success: function(res) {
//     if (res.confirm) {
//       console.log('用户点击确定')
//     } else if (res.cancel) {
//       console.log('用户点击取消')
//     }
//   }
// })
    console.log("111");
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