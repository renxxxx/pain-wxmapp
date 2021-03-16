// logs.js
const util = require('../../utils/util.js')
const app=getApp()
Page({
  data: {
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
    lastText:'上滑加载更多',
  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onShow(){
    wx.hideTabBar({
      success: function () {
        app.onTabBar('doctor');
      }
    })
  },
})
