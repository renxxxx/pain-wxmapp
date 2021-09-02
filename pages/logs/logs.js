// logs.js
const utils = require('../../utils/util.js')
const app=getApp()
Page({
  data: {
    
    diagnosesList: [],
    diagnosesStart:'',
    diagnosesPageSize:15,
    diseaseList: '',
    lastText: '加载中…',
    loginIs:true,
    shell:null,
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
  jumpThis(e){
    for(var i in this.data.diagnosesList){
      if(this.data.diagnosesList[i].diagnoseNo==e.currentTarget.dataset.user.diagnoseNo){
        this.data.diagnosesList[i].active='activeItem'
      }
    }
    this.setData({
      diagnosesList: this.data.diagnosesList
    })
    if(app.globalData.loginRefresh.userNo==e.currentTarget.dataset.fromuserno||app.globalData.loginRefresh.userNo==e.currentTarget.dataset.touserno){
      
      wx.navigateTo({
        url: '../chatNow/chatNow?diagnoseNo='+e.currentTarget.dataset.user.diagnoseNo+'&diseaseId='+e.currentTarget.dataset.user.diseaseNo+'&diseaseName=' + e.currentTarget.dataset.user.diseaseName,
      })
    }else{
      wx.showToast({
        title: '2',
      })
      wx.navigateTo({
        url: '../chatList/chatList?diagnoseNo='+e.currentTarget.dataset.user.diagnoseNo+'&diseaseId='+e.currentTarget.dataset.user.diseaseNo+'&diseaseName=' + e.currentTarget.dataset.user.diseaseName,
      })
    }
  },
    // 去登陆
    gologinBtn(e) {
      wx.navigateTo({
        url: '../login/login?tabbarIs=1&route=' + getCurrentPages()[0].route,
      })
    },
  diagnosesList(){
    let that = this
    wx.request({
      url: app.globalData.url + '/diagnoses-from-me',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      data:{
        kw:that.data.kw,
        start:that.data.diagnosesStart,
        pageSize:that.data.diagnosesPageSize,
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
              lastText:'已全部加载'
            })
           }else{
            that.setData({
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
        }else if(res.data.code == 20){
          wx.showToast({
            title: '请先登录',
            icon:'none',
            duration:1500,
            success:function(){ wx.redirectTo({
              url: '../login/login',
            })},//接口调用成功
            fail: function () { },  //接口调用失败的回调函数  
            complete: function () { } //接口调用结束的回调函数  
          })
          
        }
      }

    })
  },
  onLoad() {
    this.diagnosesList()
    this.setData({
      shell:app.globalData.shell
    })
  },
  onShow(){
    wx.hideTabBar({
      success: function () {
        app.onTabBar('doctor');
      }
    })
    if(wx.getStorageSync('cookie')){
     var loginIs=true
    }
    this.setData({
      loginIs:loginIs,
    })
  },
    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // wx.showLoading({title: '加载中…'})
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
      // wx.showLoading({title: '加载中…'})
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
    var path = '/pages/logs/logs'
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
