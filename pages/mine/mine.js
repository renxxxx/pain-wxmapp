// pages/mine/mine.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    loginIs:true,
  },

  gologin(e) {
    wx.navigateTo({
      url: '../login/login?tabbarIs=1&route=' + getCurrentPages()[0].route,
    })
  },
  // 登出
  loginOut() {
    wx.showModal({
      title: '提示',
      content: '请确认是否退出',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.url + '/logout',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'cookie': wx.getStorageSync('cookie')
            },
            method: 'get',
            success: function (res) {
              wx.hideToast()
              if (res.data.codeMsg) {
                wx.showToast({
                  title: res.data.codeMsg,
                  icon: 'none'
                })
              }
              if (res.data.code == 0) {
                wx.setStorageSync('cookie', '')
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            }
          })
        } else if (res.cancel) {
        }
      }
    })

  },
  jumpUser(){
    wx.request({
      url:app.globalData.url + '/login-refresh',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
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
    let loginIs=false
    console.log(app.globalData.loginRefresh,wx.getStorageSync('cookie'))
    if(wx.getStorageSync('cookie')){
      loginIs=true
    }
    console.log(loginIs)
    this.setData({
      loginIs:loginIs,
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
wx.stopPullDownRefresh({
  success: (res) => {},
})
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
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    var path = '/pages/mine/mine'
    return {
      title: '欢迎使用医师互联小程序', //分享内容
      path: path, //分享地址
      imageUrl: 'https://njshangka.com/favicon.ico', //分享图片
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },
  onShareTimeline: function () {
		return {
	      title: '欢迎使用医师互联小程序',
	      // query: {
	      //   id: this.data.id
	      // },
	      imageUrl: 'https://njshangka.com/favicon.ico',
	    }
	},
})