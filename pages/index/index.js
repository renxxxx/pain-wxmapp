// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    painList:[
      {painId:1,painName:'张医生',avator:'../images/tx1.png'},
      {painId:1,painName:'王医生',avator:'../images/tx2.png'},
      {painId:1,painName:'李医生',avator:'../images/tx1.png'},
      {painId:1,painName:'赵医生',avator:'../images/tx1.png'},
      {painId:1,painName:'顾医生',avator:'../images/tx2.png'},
      {painId:1,painName:'潘医生',avator:'../images/tx2.png'}
    ],
    queList:[
      { "diagnoseNo": 3, "createTime": "3月02号 5:07", "diseaseName": "脑壳疼", "lastMessage": '先去拍个片子查吧'},
      { "diagnoseNo": 1, "createTime": "昨天 4:07", "diseaseName": "肋骨疼", "lastMessage": '请上传CT请上传CT请上传CT请上传CT请上传CT请上传CT'},
      { "diagnoseNo": 2, "createTime": "今天 5:07", "diseaseName": "头疼", "lastMessage": null},
      { "diagnoseNo": 2, "createTime": "今天 5:07", "diseaseName": "头疼", "lastMessage": null},
      { "diagnoseNo": 2, "createTime": "今天 5:07", "diseaseName": "头疼", "lastMessage": null},
      { "diagnoseNo": 2, "createTime": "今天 5:07", "diseaseName": "头疼", "lastMessage": null},
      { "diagnoseNo": 2, "createTime": "今天 5:07", "diseaseName": "头疼", "lastMessage": null},
      { "diagnoseNo": 4, "createTime": "今天 14:07", "diseaseName": "腿抽筋", "lastMessage": '站久了吧你'},
    ],
    diseaseList:[{diseaseId:1,name:'头疼'},{diseaseId:2,name:'肚子疼'},{diseaseId:3,name:'胸疼'},{diseaseId:4,name:'屁股疼'},{diseaseId:5,name:'眼睛疼'},{diseaseId:6,name:'嗓子疼'},{diseaseId:7,name:'胳膊疼'},{diseaseId:8,name:'腿疼'},{diseaseId:9,name:'全身疼'}],
    lastText:'上滑加载更多',
    diseaseShow:false
  },
  diseaseList(){
    // console.log(app.globalData.mockUrl + '/pain-diagnosis/diseases')
    wx.request({
      url:app.globalData.url + '/pain-diagnosis/diseases',
      method:'get',
      success(res){
        if(res.data.code==0){
          // vm.globalData.token=res.data.data.token
          console.log(res.data.data)
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
  askQue(){
    this.setData({
      diseaseShow:true
    })
  },
  closedisease(){
    this.setData({
      diseaseShow:false
    })
  },
  // 选择病种
  diseaseSure(e){
    this.setData({
      diseaseShow:false
    })
    wx.navigateTo({
      // url: '../chatNow/chatNow?diseaseId='+e.currentTarget.dataset.id+'&diseaseName='+e.currentTarget.dataset.name,
      url: '../chat/chat?diseaseId='+e.currentTarget.dataset.id+'&diseaseName='+e.currentTarget.dataset.name,
    })
  },
  onLoad() {
    this.diseaseList()
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onShow(){
    wx.hideTabBar({
      success: function () {
        app.onTabBar('doctor');
      }
    })
  },
  onReady(){
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
