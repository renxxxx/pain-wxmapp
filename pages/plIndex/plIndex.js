// index.js
// 获取应用实例
const app = getApp()
var utils = require('../../utils/util.js');
Page({
  data: {
    painList: [],
    diagnosesList: [],
    diagnosesStart:'',
    diagnosesPageSize:15,
    diseaseList: '',
    lastText: '加载中…',
    diseaseShow: false,
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
    userNo:'',
    shell:null,
    hiddenmodalput:true,
    diseaseNameModify:'',
    diagnoseNoModify:'',
    kw:''
    // hidden:false
  },
  keyword(e){
    this.setData({
      kw:e.detail.value
    })
  },
  clearKw(e){
    this.setData({
      kw:''
    })
  },
  searchThis(e){
    wx.showLoading({title: '加载中…'})
    this.setData({
      diagnosesStart:'',
      lastText:'上滑加载更多',
      diagnosesList:[]
    })
    this.diagnosesList()
  },
  cancelM:function(e){
    this.setData({
       hiddenmodalput: true,
    })
 },

 confirmM: function (e) {
   let that=this
    if(that.data.diseaseNameModify==''||that.data.diseaseNameModify==null||that.data.diseaseNameModify==undefined){
      wx.showToast({
        title: '请输入标题',
        duration:3000,
      })
      return
    }
   
    wx.request({
      url: app.globalData.url + '/update-diagnose',
      method: 'get',
      data:{
        diagnoseNo:that.data.diagnoseNoModify,
        title:that.data.diseaseNameModify
      },
      header: { 
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      success(res) {
        if(res.data.msg){
          wx.showToast({
            title: res.data.msg,
            icon:"none",
            duration:3000
          })
        }
        if (res.data.code == 0) {
          for(var i in that.data.diagnosesList){
              if(that.data.diagnoseNoModify==that.data.diagnosesList[i].diagnoseNo){
                that.data.diagnosesList[i].diseaseName=that.data.diseaseNameModify
              }
          }
          that.setData({
            diagnosesList:that.data.diagnosesList,
            diseaseNameModify:'',
            diagnoseNoModify:'',
            hiddenmodalput:true
          })
        }
      }
    })
 },

 iName: function (e) {
    this.setData({
      diseaseNameModify:e.detail.value
    })
 },
  modifyTitle(e){
    this.setData({
      hiddenmodalput:false,
      diseaseNameModify:e.currentTarget.dataset.diseasename,
      diagnoseNoModify:e.currentTarget.dataset.diagnoseno
    })
  },
  jumpThis(e){
    for(var i in this.data.diagnosesList){
      if(this.data.diagnosesList[i].diagnoseNo==e.currentTarget.dataset.user.diagnoseNo){
        this.data.diagnosesList[i].active='activeItem'
      }
    }
    this.setData({
      diagnosesList: this.data.diagnosesList
    })
    if(app.globalData.loginRefresh.userNo==e.currentTarget.dataset.user.fromUserNo||app.globalData.loginRefresh.userNo==e.currentTarget.dataset.user.toUserNo){
      wx.navigateTo({
        url: '../chatNow/chatNow?diagnoseNo='+e.currentTarget.dataset.user.diagnoseNo+'&diseaseId='+e.currentTarget.dataset.user.diseaseNo+'&diseaseName=' + e.currentTarget.dataset.user.diseaseName,
      })
    }else{
      wx.navigateTo({
        url: '../chatList/chatList?diagnoseNo='+e.currentTarget.dataset.user.diagnoseNo+'&diseaseId='+e.currentTarget.dataset.user.diseaseNo+'&diseaseName=' + e.currentTarget.dataset.user.diseaseName,
      })
    }
  },
  diagnosesList(){
    let that = this
    wx.request({
      url: app.globalData.url + '/diagnoses-to-me',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      data:{
        start:that.data.diagnosesList.length+1,
        pageSize:that.data.diagnosesPageSize,
        kw:that.data.kw,
      },
      success(res) {
        if (res.data.code == 0) {
         
          let diagnosesStart=that.data.diagnosesStart,diagnosesList=that.data.diagnosesList
          if(res.data.data.diagnoses&&res.data.data.diagnoses.length>0){
            for(var i in res.data.data.diagnoses){
              diagnosesStart=res.data.data.diagnoses[i].diagnoseNo
            //   res.data.data.diagnoses[i].createTime= utils.getDateDiff(Date.parse(utils.renderTime(res.data.data.diagnoses[i].lastMsg.createTime).replace(/-/gi,"/")))
            //  console.log(utils.renderTime(res.data.data.diagnoses[i].createTime),res.data.data.diagnoses[i].createTime)
             if(res.data.data.diagnoses[i].lastMsg){
              res.data.data.diagnoses[i].createTime= utils.getDateDiff(Date.parse(utils.renderTime(res.data.data.diagnoses[i].lastMsg.createTime).replace(/-/gi,"/")))
              console.log(utils.renderTime(res.data.data.diagnoses[i].createTime),res.data.data.diagnoses[i].createTime)
            }else{
              res.data.data.diagnoses[i].createTime= utils.getDateDiff(Date.parse(utils.renderTime(res.data.data.diagnoses[i].createTime).replace(/-/gi,"/")))
              console.log(utils.renderTime(res.data.data.diagnoses[i].createTime),res.data.data.diagnoses[i].createTime)
            }
            }
           diagnosesList=that.data.diagnosesList.concat(res.data.data.diagnoses)
           wx.hideLoading()
           if(diagnosesList.length<that.data.diagnosesPageSize){
            that.setData({
              diagnosesList: diagnosesList,
              lastText:'已全部加载'
            })
           }else{
            that.setData({
              diagnosesList: diagnosesList,
              lastText:'上滑加载更多'
            })
           }
          }else{
            wx.hideLoading()
            that.setData({
              lastText:'已全部加载'
            })
          }
          
          that.setData({
            diagnosesStart:diagnosesStart,
            diagnosesList: diagnosesList
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
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      success(res) {
        if (res.data.code == 0) {
          for(var i in res.data.data.experts){
            res.data.data.experts[i].portrait=app.globalData.imgUrl +res.data.data.experts[i].portrait
          }
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
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      success(res) {
        if (res.data.code == 0) {
          for(var i in res.data.data.diseases){
            res.data.data.diseases[i].icon=app.globalData.imgUrl +res.data.data.diseases[i].icon
          }
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
        'cookie': wx.getStorageSync('cookie')
      },
      data:{
        diseaseNo:e.currentTarget.dataset.id
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
    this.setData({
      shell:app.globalData.shell,
      nbTitle: '新标题',
      nbLoading: false,
      nbFrontColor: '#ffffff',
      nbBackgroundColor: '#3244e4',
      userNo:app.globalData.loginRefresh.userNo
    })
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
        app.onTabBar('plan');
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
  },
    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showLoading({title: '加载中…'})
    this.setData({
      diagnosesStart:'',
      lastText:'上滑加载更多',
      diagnosesList:[]
    })
    this.diagnosesList()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.lastText=='上滑加载更多'){
      wx.showLoading({title: '加载中…'})
      this.setData({
        lastText:'加载中…'
      })
       this.diagnosesList()
    }
  },

  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    var path = '/pages/plIndex/plIndex'
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
