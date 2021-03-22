// pages/chatNow/chatNow.js
const app = getApp()
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    userId: 123,
    disease: {
      diseaseName: '头疼',
      diseaseNo: ''
    },
    diagnoseNo: '',
    msgsList:[],
   
    sendMsg: '',
    chatBoxBottom: '130',
    scrollTop: 0,
    scrollHeight: 0,
    msgsStart: '',
    msgsPageSize: 15,
    fromUserNo: '',
    toUserNo: ''
    // sendMsg:''

  },
  previewImage(e) {
    console.log(e.currentTarget.dataset.src)
    // let urls=[e.currentTarget.dataset.src]
    // console.log(urls)
    // for(var i in )
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.src] // 需要预览的图片http链接列表
    })
  },
  scrollUpper(e) {
    this.msgsList()
  },
  // 聊天详情
  diagnose() {
    let that = this
    wx.request({
      url: app.globalData.url + '/diagnose',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      data: {
        diagnoseNo: that.data.diagnoseNo,
      },
      success(res) {
        if (res.data.msg) {
          wx.showToast({
            title: res.data.msg,
            icon: 'loading'
          })
        }
        if (res.data.code == 0) {
          that.setData({
            fromUserNo: res.data.data.diagnose.fromUserNo,
            toUserNo: res.data.data.diagnose.toUserNo
          })
        }
      }
    })
  },
  // 聊天列表
  msgsList() {
    let that = this
    wx.request({
      url: app.globalData.url + '/diagnose-msgs',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      data: {
        diagnoseNo: that.data.diagnoseNo,
        start: that.data.msgsList.length+1,
        pageSize: that.data.msgsPageSize,
      },
      success(res) {
        if (res.data.code == 0) {

          let msgsStart = that.data.msgsStart,
            msgsList = that.data.msgsList
          if (res.data.data.msgs && res.data.data.msgs.length > 0) {
            for (var i in res.data.data.msgs) {
              if(res.data.data.msgs[i].img){
                res.data.data.msgs[i].img=app.globalData.imgUrl+res.data.data.msgs[i].img
              }
             
              if (res.data.data.msgs[i].userNo == that.data.fromUserNo) {
                res.data.data.msgs[i].send = 1
              } else {
                res.data.data.msgs[i].send = 0
              }
              msgsStart = res.data.data.msgs[i].msgNo
              res.data.data.msgs[i].createTime = utils.getDateDiff(Date.parse(utils.renderTime(res.data.data.msgs[i].createTime).replace(/-/gi, "/")))
              console.log(utils.renderTime(res.data.data.msgs[i].createTime), res.data.data.msgs[i].createTime)
            }
            msgsList=res.data.data.msgs.reverse().concat(that.data.msgsList)
            // msgsList = that.data.msgsList.concat(res.data.data.msgs.reverse())
            wx.hideLoading()
            console.log(msgsList)
            that.setData({
              msgsList: msgsList,
              lastText: '上滑加载更多'
            })
            if(that.data.msgsList.length<=that.data.msgsPageSize){
              that.setData({
                toView:`item${res.data.data.msgs.length-1}`
                // toView: `item${that.data.msgsList.length-1}`
              })
            }
            
          } else {
            wx.hideLoading()
            that.setData({
              lastText: '当前无更多数据'
            })
          }

          that.setData({
            msgsStart: msgsStart,
            msgsList: msgsList
          })
        }
      }

    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this,
      height = 0
    wx.getSystemInfo({
      success: function (res) {

        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let changeHeight = 750 / clientWidth;
        height = clientHeight * changeHeight;
        console.log(res, height)
      }
    })
    that.setData({
      scrollHeight: height,
      scrollTop: height,
      scrollHeightEnd: height,

    })
    that.setData({
      toView: `item${that.data.msgsList.length-1}`
    })

    wx.setNavigationBarTitle({
      title: (options.diseaseName === 'null' ? "" : options.diseaseName) + '(' + options.diagnoseNo + ')',
    })
    let disease = {}
    disease.diseaseName = options.diseaseName
    disease.diseaseNo = options.diseaseNo
    that.setData({
      disease: disease,
      diagnoseNo: options.diagnoseNo
    })
    that.diagnose()
    that.msgsList()
  },
  bindlinechange(e) {
    this.setData({
      chatBoxBottom: e.detail.heightRpx + 66,
      // scrollHeightEnd:e.detail.heightRpx+66<212?app.globalData.height-this.data.chatBoxBottom:app.globalData.height-212,
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