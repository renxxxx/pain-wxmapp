// pages/chat/chat.js
// 获取小程序实例
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:'',
    avatar:'',
    chatlists:[
      {
        nickname:'小林',
        avatar:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591617971938&di=30d9f3b49a0d1b27fb4b61ea424f82c9&imgtype=0&src=http%3A%2F%2Fa-ssl.duitang.com%2Fuploads%2Fitem%2F201610%2F07%2F20161007135058_nUxji.jpeg',
        content:`你好呀！`
      }
    ],
    invalue:''
  },
  sendMsg:function(){
    let _this = this;
    let obj = {
      nickname:_this.data.nickname,
      avatar:_this.data.avatar,
      content:_this.data.invalue
    };
    let arr = _this.data.chatlists;
    arr.push(obj)
    _this.setData({
      chatlists:arr,
      invalue:''
    });

    // 把聊天内容发送到服务器，处理完成后返回，再把返回的数据放到chatlist里面

  },
  getInput:function(e){
    console.log(e.detail.value);
    this.setData({invalue:e.detail.value});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo.nickName);
    this.setData({
      nickname:app.globalData.userInfo.nickName,
      avatar:app.globalData.userInfo.avatarUrl
    });
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
