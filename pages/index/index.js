// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    painList: [],
    diagnosesList: [],
    diagnosesStart:'',
    diagnosesPageSize:15,
    diseaseList: '',
    lastText: '上滑加载更多',
    diseaseShow: false
  },
  diagnosesList(){
    let that = this
    wx.request({
      url: app.globalData.url + '/diagnoses',
      method: 'get',
      data:{
        start:that.data.diagnosesStart,
        pageSize:that.data.diagnosesPageSize,
      },
      success(res) {
        if (res.data.code == 0) {
          that.setData({
            diagnosesList: res.data.data.diagnoses
          })
        }
      }

    })
  },
  painList() {
    let that = this
    wx.request({
      url: app.globalData.url + '/experts',
      method: 'get',
      success(res) {
        if (res.data.code == 0) {
          that.setData({
            painList: res.data.data.experts
          })
        }
      }

    })
  },
  diseaseList() {
    let that = this
    wx.request({
      url: app.globalData.url + '/diseases',
      method: 'get',
      success(res) {
        if (res.data.code == 0) {
          that.setData({
            diseaseList: res.data.data.diseases
          })
        }
      }

    })
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  askQue() {
    this.setData({
      diseaseShow: true
    })
  },
  closedisease() {
    this.setData({
      diseaseShow: false
    })
  },
  // 选择病种
  diseaseSure(e) {
    this.setData({
      diseaseShow: false
    })
    wx.request({
      url: app.globalData.url + '/ask-diagnose',
      method: 'get',
       header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': app.globalData.cookie
      },
      data:{
        diseaseId:e.currentTarget.dataset.id
      },
      success(res) {
        if (res.data.code == 0) {
          let diagnoseNo=res.data.data.diagnoseNo
          wx.navigateTo({
            url: '../chatNow/chatNow?diseaseId=' + e.currentTarget.dataset.id + '&diseaseName=' + e.currentTarget.dataset.name+ '&diagnoseNo=' + diagnoseNo,
            // url: '../chat/chat?diseaseId='+e.currentTarget.dataset.id+'&diseaseName='+e.currentTarget.dataset.name,
          })
        }
      }

    })
    
  },
  onLoad() {
    this.painList()
    this.diseaseList()
    this.diagnosesList()
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onShow() {
    wx.hideTabBar({
      success: function () {
        app.onTabBar('doctor');
      }
    })
  },
  onReady() {
    wx.hideTabBar()
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})