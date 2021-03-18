// pages/mine/mine.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionList:[''],
    userInfo:''
  },
  jumpUser(){
    wx.request({
      url:vm.globalData.url + '/login-refresh',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': vm.globalData.cookie
      },
      data:{
        entrance:1
      },
      method:'get',
      success(res){
        if(res.data.code==0){
              app.globalData.loginRefresh=res.data.data
              wx.switchTab({
                url: '../plIndex/plIndex',
              })
        }
      }
    })
    
  },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:app.globalData.loginRefresh
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
  onShow(){
    wx.hideTabBar({
      success: function () {
        app.onTabBar('doctor');
      }
    })
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