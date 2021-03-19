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
  },
  jumpThis(e){

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
        start:that.data.diagnosesStart,
        pageSize:that.data.diagnosesPageSize,
      },
      success(res) {
        if (res.data.code == 0) {
         
          let diagnosesStart=that.data.diagnosesStart,diagnosesList=that.data.diagnosesList
          if(res.data.data.diagnoses&&res.data.data.diagnoses.length>0){
            for(var i in res.data.data.diagnoses){
              diagnosesStart=res.data.data.diagnoses[i].diagnoseNo
              res.data.data.diagnoses[i].createTime= utils.getDateDiff(Date.parse(utils.renderTime(res.data.data.diagnoses[i].createTime).replace(/-/gi,"/")))
             console.log(utils.renderTime(res.data.data.diagnoses[i].createTime),res.data.data.diagnoses[i].createTime)
           }
           diagnosesList=that.data.diagnosesList.concat(res.data.data.diagnoses)
           wx.hideLoading()
           if(diagnosesList.length<that.data.diagnosesPageSize){
            that.setData({
              lastText:'数据已全部加载完成'
            })
           }else{
            that.setData({
              lastText:'上滑加载更多'
            })
           }
          
          }else{
            wx.hideLoading()
            that.setData({
              lastText:'数据已全部加载完成'
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
  onLoad() {
    this.diagnosesList()
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
})
