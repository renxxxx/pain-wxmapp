// pages/login/login.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIs:false,
    version:app.globalData.version,
    tabbarIs:'',
    route:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.route){
      options.route='../'+options.route.split('pages/')[1]
      this.setData({
        route:options.route,
        tabbarIs:options.tabbarIs,
        id:options.id,
      })
    }
  },
  loginWx: function () {
    var that = this
    that.setData({
      showIs: true
    })
  },
  bindGetUserInfo: function(e) {
    var that=this
    console.log(e.detail.userInfo)
    if (e.detail.userInfo){
      wx.showToast({
        title: '登录中，请稍后',
        icon:'none',
        duration: 5000,
      })
      //用户按了允许授权按钮
      
      wx.login({
        success(res) {
          console.log(e.detail.userInfo.nickName)
          var code = res.code
          if(e.detail.userInfo.nickName!=null&&e.detail.userInfo.nickName!=undefined&&e.detail.userInfo.nickName!=''){
            wx.request({
              url: app.globalData.url + '/login-by-wxmapp',
              header: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              method: 'get',
              data: {
                code: code,
                nickname:e.detail.userInfo.nickName,
                headimg:e.detail.userInfo.avatarUrl,
              },
              success: function (res) {
                wx.hideToast()
                if (res.data.code == 0) {
                  // app.globalData.cookie=res.header['Set-Cookie']
                  // app.globalData.cookie=res.data.data.cookie
                  wx.setStorageSync('cookie', res.header['Set-Cookie'])
                  wx.request({
                    url: app.globalData.url + '/login-refresh',
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      'cookie': wx.getStorageSync('cookie')
                    },
                    method: 'get',
                    success: function (res) {
                      wx.hideToast()
                      if (res.data.code == 0) {
                        app.globalData.loginIf=1
                        // debugger
                        app.globalData.loginRefresh = res.data.data
                        wx.showToast({
                          title: '登录成功',
                          icon: 'none',
                          duration: 2000,
                          mask: true,
                          complete: function complete(res) {
                            setTimeout(function () {   
                                if(that.data.tabbarIs==1&&that.data.route!=''){
                                  wx.reLaunch({
                                    url: that.data.route,
                                  }) 
                                }else if(that.data.tabbarIs==0&&that.data.route!=''){
                                  if(that.data.id){
                                    wx.navigateBack()
                                    // wx.redirectTo({
                                    //   url: that.data.route+'?id='+that.data.id,
                                    // }) 
                                  }else{
                                    wx.redirectTo({
                                      url: that.data.route,
                                    }) 
                                  }
                                 
                                }else{
                                  wx.reLaunch({
                                    url: '../index/index',
                                  })
                                }
                            }, 100);
                          }
                        });
    
                      } else {
                        wx.showToast({
                          title: res.data.codeMsg,
                          icon: 'none'
                        })
                      }
                    }
                  })
                } else {
                  wx.showToast({
                    title: res.data.codeMsg,
                    icon: 'none'
                  })
                }
              }
            })
          }else{
            wx.showToast({
              title: '授权失败',
              icon: 'none',
              duration: 2000,
            });
          }
        }
      })

    } else {
      //用户按了拒绝按钮
      wx.showToast({
        title: '登录失败',
        icon:'none'
      })
    }
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