// pages/chatNow/chatNow.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    userId:123,
    disease:{diseaseName:'头疼',diseaseId:''},
    diseaseNo:'123123123',
    diseaseMsg:[ {messageNo:1,createTime:'上午9:00',img:'../images/wzj1.jpg',txt:'',userNo:'123'},
    {messageNo:1,createTime:'上午9:00',img:'',txt:'你好吗你好吗你好吗你,好吗你好吗你好吗你好吗你好吗',userNo:'1234'},
    {messageNo:1,createTime:'上午9:00',img:'../images/wzj1.jpg',txt:'',userNo:'1234'},
    {messageNo:1,createTime:'上午9:00',img:'',txt:'你好吗',userNo:'123'},
    {messageNo:1,createTime:'上午9:00',img:'../images/wzj.jpg',txt:'',userNo:'123'},
    {messageNo:1,createTime:'3分钟前',img:'../images/wzj.jpg',txt:'',userNo:'1234'},
    {messageNo:1,createTime:'3分钟前',img:'',txt:'你好吗,你好吗,,你好吗你好吗你好吗',userNo:'123'},
    {messageNo:1,createTime:'3分钟前',img:'../images/wzj.jpg',txt:'',userNo:'123'},
    {messageNo:1,createTime:'3分钟前',img:'',txt:'12312321312312312321312312312312312312312321',userNo:'1234'},
    {messageNo:1,createTime:'3分钟前',img:'../images/wzj.jpg',txt:'',userNo:'1234'},
    {messageNo:1,createTime:'3分钟前',img:'../images/wzj.jpg',txt:'',userNo:'1234'},
    {messageNo:1,createTime:'3分钟前',img:'',txt:'你好吗',userNo:'1234'},
    {messageNo:1,createTime:'3分钟前',img:'',txt:'你好吗',userNo:'1234'},
    {messageNo:1,createTime:'3分钟前',img:'../images/wzj.jpg',txt:'',userNo:'1234'}],
    sendMsg:'',
    chatBoxBottom:'130',
    scrollTop:0,
    scrollHeight:0,
    // sendMsg:''
    
  },
  previewImage(e){
    console.log(e.currentTarget.dataset.src)
    // let urls=[e.currentTarget.dataset.src]
    // console.log(urls)
    // for(var i in )
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.src] // 需要预览的图片http链接列表
    })
  },
  sendMsg(e){
    let diseaseMsg=this.data.diseaseMsg
    diseaseMsg.push({messageNo:2,createTime:'3分钟前',img:'',txt:e.detail.value,userNo:'123'})
    this.setData({
      diseaseMsg:diseaseMsg,
      toView:`item${this.data.diseaseMsg.length-1}`,
      sendMsg:''
    })
  },
  sendPic: function (e) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        // var picBlobShow = that.data.picBlobShow
        // var picBlob = that.data.picBlob
        console.log(tempFilePaths)
        let diseaseMsg=that.data.diseaseMsg
        diseaseMsg.push({messageNo:2,createTime:'3分钟前',img:tempFilePaths[0],txt:'',userNo:'123'})
        that.setData({
          diseaseMsg:diseaseMsg,
          toView:`item${that.data.diseaseMsg.length-1}`,
          sendMsg:''
        })
        // for (var i in tempFilePaths) {
        //   wx.uploadFile({
        //     url: app.globalData.url + '/upload-file?cover&duration', //仅为示例，非真实的接口地址
        //     filePath: tempFilePaths[i],
        //     name: 'file',
        //     success: function (res) {
        //       console.log(res)
        //       var data = JSON.parse(res.data);
        //       var url = data.data.url
             
        //       if (data.code == 0) {
        //         wx.showToast({
        //           title: '上传成功',
        //           icon: 'none',
        //           duration: 2000
        //         })
        //         picBlob = picBlob + ',' + url
        //         if (picBlob.slice(0, 1) == ',') {
        //           picBlob = picBlob.slice(1, picBlob.length )
        //         }
        //         picBlobShow.push({ 'src': app.globalData.domain + url })
        //         that.setData({
        //           picBlob: picBlob,
        //           picBlobShow: picBlobShow,
        //         })
        //       }
        //     },
        //     fail: function (res) {
        //       console.log(res)
        //     }
        //   })
        // }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let that=this,height=0
    wx.getSystemInfo({
      success: function (res) {

        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let changeHeight = 750 / clientWidth;
         height = clientHeight * changeHeight;
        console.log(res,height)
        // vm.globalData.height=height
    }})
    that.setData({
      scrollHeight: height,
      scrollTop: height,
      scrollHeightEnd:height-that.data.chatBoxBottom,
     
    })
    that.setData({
      // windowHeight: height,
      toView:`item${that.data.diseaseMsg.length-1}`
    })
    // that.pageScrollToBottom();

    wx.setNavigationBarTitle({
      title: options.diseaseName+'('+that.data.diseaseNo+')',
    })
    let disease={}
     disease.diseaseName=options.diseaseName
     disease.diseaseId=options.diseaseId
     that.setData({
      disease:disease
    })
  },
  bindlinechange(e){
    this.setData({
      chatBoxBottom:e.detail.heightRpx+66,
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