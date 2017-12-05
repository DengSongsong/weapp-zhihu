// pages/comment/comment.js
var util = require('../../utils/util.js');
let myComment = '';
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    comment: [],
    content: "",
    isLoading: true,//是否显示加载数据提示
    disabled: true,
    cfBg: false,
    _index: 0,
  },
  onTextChanged: function(e){
    console.log(e);
    myComment = e.detail.value;
    console.log(myComment);
  },
  onSendClicked: function(e){
    console.log(e);
    let question_id = e.target.dataset.questionid;
    var that = this,conArr = [];
    setTimeout(function(){
      if(myComment.length > 0){
        conArr.push({
          "feed_source_img": "../../images/icon9.jpeg",
          "feed_source_name": "zero",
          "time": util.formatTime(new Date()),
          "good_num": "0",
          "comment_num": "0",
          "content": myComment
        })
        // var newArr = conArr.reverse();
        // console.log(newArr);
        var feed = util.getData2();
        let comment_data = feed.comment;
        const comment = comment_data.filter((comment) => {
            return question_id == comment.question_id;
        })
        console.log(comment);
        console.log(comment[0].ordinaryComment);
        console.log(that.data.comment);
        var commentContent = comment[0].ordinaryComment.concat(conArr);
        console.log(commentContent);
        var newCommentContent = commentContent.reverse();
        console.log(newCommentContent);
        var newComment = comment[0];
        comment[0].ordinaryComment = newCommentContent;
        console.log(comment[0]);
        console.log(comment);
        that.setData({
            comment: comment,
            content: ""
        })
      }
    },100)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let question_id = options.question_id;
    console.log(question_id);
    var feed = util.getData2();
    console.log(feed);
    let comment_data = feed.comment;
    console.log(comment_data);
    const comment = comment_data.filter((comment) => {
      return question_id == comment.question_id;
    })
    console.log(comment);
    this.setData({
      comment: comment
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