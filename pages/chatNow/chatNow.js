// pages/chatNow/chatNow.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:123,
    disease:{diseaseName:'头疼',diseaseId:''},
    diseaseNo:'123123123',
    diseaseMsg:[ {messageNo:1,createTime:'上午9:00',img:'../images/wzj1.jpg',txt:'',userNo:'123'},
    {messageNo:1,createTime:'上午9:00',img:'../images/wzj.jpg',txt:'你好吗你好吗你好吗你,好吗你好吗你好吗你好吗你好吗',userNo:'1234'},
    {messageNo:1,createTime:'上午9:00',img:'../images/wzj1.jpg',txt:'你好吗',userNo:'1234'},
    {messageNo:1,createTime:'上午9:00',img:'',txt:'你好吗',userNo:'123'},
    {messageNo:1,createTime:'上午9:00',img:'../images/wzj.jpg',txt:'',userNo:'123'},
    {messageNo:1,createTime:'3分钟前',img:'../images/wzj.jpg',txt:'你好吗',userNo:'1234'},
    {messageNo:1,createTime:'3分钟前',img:'',txt:'你好吗,你好吗,,你好吗你好吗你好吗',userNo:'123'},
    {messageNo:1,createTime:'3分钟前',img:'../images/wzj.jpg',txt:'',userNo:'123'},
    {messageNo:1,createTime:'3分钟前',img:'../images/wzj.jpg',txt:'你好吗',userNo:'1234'}],
    sendMsg:'confont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具confont-国confont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具confont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前confont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具confont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具confont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具confont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具端开发的便捷工具内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具confont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具confont-国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具',
    // sendMsg:''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let disease={}
     disease.diseaseName=options.diseaseName
     disease.diseaseId=options.diseaseId
    this.setData({
      disease:disease
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