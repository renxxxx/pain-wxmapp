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
    kw:'',
    showPhone:false,
    loginIs:true
    // hidden:false
  },
  quickUp(e){
    let that =this
    if(that.data.loginIs==false){
      wx.navigateTo({
        url: '../login/login',
      })
      return
    }
    
    wx.request({
      url: app.globalData.url + '/superexpert-let-me-reply?diagnoseNo='+e.currentTarget.dataset.user.diagnoseNo,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      method: 'get',
      success: function (res) {
        wx.hideToast()
        if (res.data.code == 0) {
          for(var i in that.data.diagnosesList){
      
            if(that.data.diagnosesList[i].diagnoseNo==e.currentTarget.dataset.user.diagnoseNo){
              that.data.diagnosesList[i].active='activeItem',
              that.data.diagnosesList[i].quickUpShow=false
            }
            that.setData({
              diagnosesList: that.data.diagnosesList
            })
          }
          wx.navigateTo({
            url: '../chatNow/chatNow?diagnoseNo='+e.currentTarget.dataset.user.diagnoseNo+'&diseaseId='+e.currentTarget.dataset.user.diseaseNo+'&diseaseName=' + e.currentTarget.dataset.user.diseaseName,
          })
        } else {
          wx.showToast({
            title: res.data.codeMsg,
            icon: 'none'
          })
        }
      }
    })
   
  },
 
  getPhoneNumber(e) {
 
    var that=this
    console.log(e.detail)
    console.log(e.detail.iv)
    wx.showToast({
      title: '授权中，请稍后',
      icon:'none',
      duration:1000
    })
    that.setData({
      encryptedData:encodeURIComponent(e.detail.encryptedData),
      iv:encodeURIComponent(e.detail.iv)
    })

    
    // wx.login({
    //     success(res) {
    //       var jscode = res.code
          if(e.detail.encryptedData!=null&&e.detail.encryptedData!=''&&e.detail.encryptedData!=undefined){
            wx.request({
              url: app.globalData.url + '/bind-phone-by-wxminapp',
              header: {
                "Content-Type": "application/x-www-form-urlencoded",
                'cookie': wx.getStorageSync('cookie')
              },
              data:'encryptedData='+encodeURIComponent(e.detail.encryptedData)+'&iv='+encodeURIComponent(e.detail.iv),
              // +'&jscode='+jscode,
              method: 'post',
              success: function (res) {
                wx.hideToast()
                if (res.data.code == 0) {
                  that.setData({
                    showPhone:false
                  })
                } else {
                  wx.showToast({
                    title: res.data.codeMsg,
                    icon: 'none'
                  })
                }
              }
            })
          }else{
            wx.showToast({
              title: '获取失败请重试',
              icon:'none',
              duration:1000
            })
          }
      //   }
      // })
   
   
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
    if(this.data.loginIs==false){
      wx.navigateTo({
        url: '../login/login',
      })
      return
    }
    wx.showLoading({title: '加载中…'})
    this.setData({
      diagnosesStart:'',
      lastText:'上滑加载更多',
      diagnosesList:[]
    })
    this.diagnosesList()
  },
  jumpThis(e){
    if(this.data.loginIs==false){
      wx.navigateTo({
        url: '../login/login',
      })
      return
    }
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
      url: app.globalData.url + '/diagnoses',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      data:{
        kw:that.data.kw,
        start:that.data.diagnosesList.length+1,
        pageSize:that.data.diagnosesPageSize,
      },
      success(res) {
        if (res.data.code == 0) {
         
          let diagnosesStart=that.data.diagnosesStart,diagnosesList=that.data.diagnosesList
          if(res.data.data.diagnoses&&res.data.data.diagnoses.length>0){
            for(var i in res.data.data.diagnoses){
              if(that.data.superexpert==1&&that.data.userNo!=res.data.data.diagnoses[i].toUserNo&&that.data.userNo!=res.data.data.diagnoses[i].fromUserNo){
                res.data.data.diagnoses[i].quickUpShow=true
              }
              if(res.data.data.diagnoses[i].lastMsg&&res.data.data.diagnoses[i].lastMsg.userNo&&res.data.data.diagnoses[i].lastMsg.userNo==res.data.data.diagnoses[i].toUserNo){
                res.data.data.diagnoses[i].lastM='专家'
              }else if(res.data.data.diagnoses[i].lastMsg&&res.data.data.diagnoses[i].lastMsg.userNo&&res.data.data.diagnoses[i].lastMsg.userNo==res.data.data.diagnoses[i].fromUserNo){
                res.data.data.diagnoses[i].lastM='用户'
              }
              res.data.data.diagnoses[i].active=''
              diagnosesStart=res.data.data.diagnoses[i].diagnoseNo
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
            if(res.data.data.experts[i].portrait&&res.data.data.experts[i].portrait.slice(0,1)!='h'){
              res.data.data.experts[i].portrait=app.globalData.imgUrl +res.data.data.experts[i].portrait
            }
            
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
    if(this.data.loginIs==false){
      wx.navigateTo({
        url: '../login/login',
      })
      return
    }
    if(this.data.shell!=1){
      this.setData({
        diseaseShow: true
      })
    }else{
      wx.request({
        url: app.globalData.url + '/ask-diagnose',
        method: 'get',
         header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'cookie': wx.getStorageSync('cookie')
        },
        data:{
          diseaseNo:'',
        },
        success(res) {
          if (res.data.code == 0) {
            let diagnoseNo=res.data.data.diagnoseNo
            wx.navigateTo({
              url: '../chatNow/chatNow?diseaseId=&diseaseName=&diagnoseNo=' + diagnoseNo,
              // url: '../chat/chat?diseaseId='+e.currentTarget.dataset.id+'&diseaseName='+e.currentTarget.dataset.name,
            })
          }
        }
  
      })
    }
  },
  closedisease() {
    this.setData({
      diseaseShow: false
    })
  },
  // 选择病种
  diseaseSure(e) {
    if(this.data.loginIs==false){
      wx.navigateTo({
        url: '../login/login',
      })
      return
    }
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
  
  onShow() {
    wx.hideTabBar({
      success: function () {
        app.onTabBar('doctor');
      }
    })
    var that=this
    wx.request({
      url:app.globalData.url + '/login-refresh',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      method:'get',
      success(res){
        if(res.data.code==0){
          app.globalData.loginRefresh=res.data.data
          // if(res.data.data.superexpert==1){
            that.setData({superexpert:res.data.data.superexpert,userNo:res.data.data.userNo})
          // }
              if(res.data.data.lastEntrance==1){
                wx.switchTab({
                  url: '/pages/plIndex/plIndex',
                })
              }else {
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }
              if(res.data.data.phone==null||res.data.data.phone==''||res.data.data.phone==undefined){
                that.setData({
                  showPhone:true
                })
              }
              if(that.data.diagnosesList.length==0){
that.diagnosesList()
              }
        }else if(res.data.code==20){
          that.setData({
            loginIs:false
          })
          // wx.redirectTo({
          //   url: '../login/login',
          // })
        }
      }
    })
    wx.request({
      url: app.globalData.url+'/archive?name=shell',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      success(res){
        console.log(res)
        that.setData({
          shell:res.data.data.archive.shell
        })
        app.globalData.shell=res.data.data.archive.shell
      }
    })
  },
  onLoad() {
    this.setData({
      nbTitle: '新标题',
      nbLoading: false,
      nbFrontColor: '#ffffff',
      nbBackgroundColor: '#3244e4',
      userNo:app.globalData.loginRefresh.userNo
    })
    this.painList()
    this.diseaseList()
    this.diagnosesList()
    let that=this
    wx.request({
      url:app.globalData.url + '/login-refresh',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookie')
      },
      method:'get',
      success(res){
        if(res.data.code==0){
          app.globalData.loginRefresh=res.data.data
            that.setData({superexpert:res.data.data.superexpert,userNo:res.data.data.userNo})
           
        }else if(res.data.code==20){
          that.setData({
            loginIs:false
          })
        }
      }
    })
   
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onReady() {
    wx.hideTabBar()
  },
  onHide(){
    console.log(12312312);
    
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
      diagnosesList:[],
      painList:[]
    })
    this.painList()
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
    var path = '/pages/index/index'
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
