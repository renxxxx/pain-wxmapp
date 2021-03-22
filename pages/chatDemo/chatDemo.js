// pages/chatNow/chatNow.js
const app=getApp()
var utils = require('../../utils/util.js');
var socketOpen = false;
var frameBuffer_Data, session, SocketTask;
console.log(app)
var url = 'wss://dev.inininininin.com/pain/websocket/';
var upload_url ='https://dev.inininininin.com/pain/upload'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    userNo:'',
    disease:{diseaseName:'',diseaseId:''},
    diagnoseNo:'',

    // msgsList:[],
    sendMsg:'',
    chatBoxBottom:'130',
    scrollTop:0,
    scrollHeight:0,
    msgsStart: '',
    msgsPageSize: 15,
    fromUserNo: '',
    toUserNo: '',
    // sendMsg:''
    // socket部分
    user_input_text: '',//用户输入文字
    inputValue: '',
    returnValue: '',
    addImg: false,
    //格式示例数据，可为空
    allContentList: [],
    msgsList:[],//相当于allContentList
    num: 0
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
        let msgsList=that.data.msgsList
        msgsList.push({messageNo:2,createTime:'3分钟前',img:tempFilePaths[0],txt:'',userNo:'123'})
        that.setData({
          msgsList:msgsList,
          toView:`item${that.data.msgsList.length-1}`,
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
    console.log(url)
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
      toView:`item${that.data.msgsList.length-1}`
    })
    wx.setNavigationBarTitle({
      title: (options.diseaseName==='null'?"":options.diseaseName)+'('+options.diagnoseNo+')',
    })
    let disease={}
     disease.diseaseName=options.diseaseName
     disease.diseaseId=options.diseaseId
     that.setData({
      disease:disease,
      diagnoseNo:options.diagnoseNo,
      userNo:app.globalData.loginRefresh.userNo
    })
    that.msgsList()
  },
  bindlinechange(e){
    this.setData({
      chatBoxBottom:e.detail.heightRpx+66,
      // scrollHeightEnd:e.detail.heightRpx+66<212?app.globalData.height-this.data.chatBoxBottom:app.globalData.height-212,
    })

  },
  bindfocusEn	(e){
    console.log(e.detail,e.detail.height)
    // if(){

    // }
    this.setData({
      topStyle:app.globalData.height-parseInt(e.detail.height)*2+130
    })
  },
  bindblurEn	(e){
    this.setData({
      topStyle:0
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    SocketTask.onOpen(res => {

      socketOpen = true;
      console.log('监听 WebSocket 连接打开事件。', res)
    })
    SocketTask.onClose(onClose => {
      console.log('监听 WebSocket 连接关闭事件。', onClose)
      socketOpen = false;
      this.webSocket()
    })
    SocketTask.onError(onError => {
      console.log('监听 WebSocket 错误。错误信息', onError)
      socketOpen = false
    })
    SocketTask.onMessage(onMessage => {
   
      let imgData=JSON.parse(onMessage.data)
      if(imgData.diagnoseNo==this.data.diagnoseNo){
        let msgsList=this.data.msgsList
        if(imgData.img){
          imgData.img=app.globalData.imgUrl+imgData.img
        }
        console.log(imgData)
      msgsList.push(imgData)
      this.setData({
        msgsList:msgsList,
        toView:`item${this.data.msgsList.length-1}`,
        // sendMsg:''
      })
      console.log(this.data.msgsList)
      }
      
      // console.log('监听WebSocket接受到服务器的消息事件。服务器返回的消息', JSON.parse(onMessage.data))
      var onMessage_data =onMessage.data// JSON.parse(onMessage.data)
    //   if (onMessage_data.cmd == 1) {
    //     that.setData({
    //       link_list: text
    //     })
    //     console.log(text, text instanceof Array)
    //     // 是否为数组
    //     if (text instanceof Array) {
    //       for (var i = 0; i < text.length; i++) {
    //         text[i]
    //       }
    //     } else {
 
    //     }
    //     that.data.allContentList.push({ is_ai: true, text: onMessage_data.body });
    //     that.setData({
    //       allContentList: that.data.allContentList
    //     })
    //     that.bottom()
    //   }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!socketOpen) {
      this.webSocket()
    }
  },
  webSocket: function () {
    console.log(app.globalData.token)
    // 创建Socket
    SocketTask = wx.connectSocket({
      url: url+app.globalData.loginRefresh.userNo,
      data: 'data',
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
      success: function (res) {
        console.log('WebSocket连接创建', res)
        socketOpen = true
      },
      fail: function (err) {
        wx.showToast({
          title: '网络异常！',
        })
        console.log(err)
      },
    })
  },
  sendMsgBind(e){
    this.setData({
      sendMsg:e.detail.value
    })
  },
  sendMsg(e){
    let msgsList=this.data.msgsList
    // msgsList.push({messageNo:2,createTime:'3分钟前',img:'',txt:e.detail.value,userNo:'123'})
   
// console.log(this.data.sendMsg)
    let that = this;
    var data = {
      action:'1',
      text:this.data.sendMsg,
      img:"",
      diagnoseNo:that.data.diagnoseNo
    }
    console.log(socketOpen)
    if (socketOpen) {
      
      // 如果打开了socket就发送数据给服务器
      sendSocketMessage(data)
      // this.data.allContentList.push({ is_my: { text: this.data.inputValue }});
      msgsList.push({
        action:'1',
        text:this.data.sendMsg,
        img:"",
        diagnoseNo:that.data.diagnoseNo,
        userNo:app.globalData.loginRefresh.userNo,
      })
      this.setData({
        msgsList:msgsList,
        toView:`item${this.data.msgsList.length-1}`,
        sendMsg:''
      })
    }
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
 
  onHide: function () {
    SocketTask.close(function (close) {
      console.log('关闭 WebSocket 连接。', close)
    })
  },
  upimg: function () {
    var that = this;
    var msgsList=that.data.msgsList
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        success: function (res) {
          that.setData({
            img: res.tempFilePaths
          })
          let tempFilePaths=res.tempFilePaths
          wx.uploadFile({
            url: upload_url,
            filePath: tempFilePaths[0],
            name: 'file',
            success: function (res) {
              console.log(JSON.parse(res.data),JSON.parse(res.data).data.url)
                // wx.showToast({
                //   title: '图片发送成功！',
                //   duration: 3000
                // });
                 var imgurl=JSON.parse(res.data).data.url
                var data = {
                  action:'1',
                  text:'',
                  img:imgurl,
                  diagnoseNo:that.data.diagnoseNo
                }
                console.log(socketOpen)
                if (socketOpen) {
                  
                  // 如果打开了socket就发送数据给服务器
                  sendSocketMessage(data)
                  if(imgurl){
                    imgurl=app.globalData.imgUrl+imgurl
                  }
                  // this.data.allContentList.push({ is_my: { text: this.data.inputValue }});
                  msgsList.push({
                    action:'1',
                    text:'',
                    img:imgurl,
                    diagnoseNo:that.data.diagnoseNo,
                    userNo:app.globalData.loginRefresh.userNo,
                  })
                  that.setData({
                    msgsList:msgsList,
                    toView:`item${that.data.msgsList.length-1}`,
                    sendMsg:''
                  })
                }


            }
          })  
        
        // url
        }
      })
  },   
  addImg: function () {
    this.setData({
      addImg: !this.data.addImg
    })
 
  },
  // 获取hei的id节点然后屏幕焦点调转到这个节点  
  bottom: function () {
    var that = this;
    this.setData({
      scrollTop: 1000000
    })
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
    wx.stopPullDownRefresh()
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
//通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
function sendSocketMessage(msg) {
  var that = this;
  console.log('通过 WebSocket 连接发送数据', JSON.stringify(msg))
  console.log(SocketTask)
  SocketTask.send({
    data: JSON.stringify(msg)
  }, function (res) {
    console.log('已发送', res)
  })
} 