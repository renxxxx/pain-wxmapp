// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.hideTabBar()
    let vm=this
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     wx.request({
    //       url:vm.globalData.url + '/login-by-wxmapp',
    //       data:{
    //         code:res.code
    //       },
    //       method:'get',
    //       success(res){
    //         if(res.data.code==0){
    //           wx.setStorageSync('cookie', res.header['Set-Cookie'])
              // wx.request({
              //   url:vm.globalData.url + '/login-refresh',
              //   header: {
              //     "Content-Type": "application/x-www-form-urlencoded",
              //     'cookie': wx.getStorageSync('cookie')
              //   },
              //   method:'get',
              //   success(res){
              //     if(res.data.code==0){
              //           vm.globalData.loginRefresh=res.data.data
              //           if(res.data.data.lastEntrance==1){
              //             wx.switchTab({
              //               url: '/pages/plIndex/plIndex',
              //             })
              //           }else {
              //             wx.switchTab({
              //               url: '/pages/index/index',
              //             })
              //           }
                        
              //     }else if(res.data.code==20){
              //       wx.redirectTo({
              //         url: '../login/login',
              //       })
              //     }
              //   }
              // })
    //         }
    //       }
    
    //     })
    //   }
    // })

    wx.getSystemInfo({
      success: function (res) {

        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let changeHeight = 750 / clientWidth;
        let height = clientHeight * changeHeight;
        vm.globalData.height=height
    }})
    
  },
  
  // 自定义显示tabbar
onTabBar: function(key) {
  var _curPageArr = getCurrentPages();
  var _curPage = _curPageArr[_curPageArr.length - 1];
  var _pagePath = _curPage.__route__;
  if (_pagePath.indexOf('/') != 0) {
    _pagePath = '/' + _pagePath;
  }
  var tabBar = this.tabBarData[key];
  for (var i = 0; i < tabBar.list.length; i++) {
    tabBar.list[i].active = false;
    if (tabBar.list[i].pagePath == _pagePath) {
      tabBar.list[i].active = true; // 根据页面地址设置当前页面状态    
    }
  }
  _curPage.setData({
    tabBar: tabBar
  });
},
tabBarData: {
  userInfo: null,
  pop: 2,
  num: 0,
  doctor: {
    "color": "#999999",
    "selectedColor": "#1296db",
    "backgroundColor": "white",
    "borderStyle": "#eee",
    "position": "bottom",
    "list": [
      {
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/pages/images/sy.png",
        "selectedIconPath": "/pages/images/sy1.png",
        "clas": "tabbar-item",
        "active": true
      },
      {
        "pagePath": "/pages/logs/logs",
        "text": "提问记录",
        "iconPath": "/pages/images/jl.png",
        "selectedIconPath": "/pages/images/jl1.png",
        "clas": "tabbar-item",
        "active": false
      },
      {
        "pagePath": "/pages/mine/mine",
        "text": "我的",
        "iconPath": "/pages/images/wd.png",
        "selectedIconPath": "/pages/images/wd1.png",
        "clas": "tabbar-item",
        "active": false
      }
    ]
  },
  plan: {
    "color": "#999999",
    "selectedColor": "#1296db",
    "backgroundColor": "white",
    "borderStyle": "white",
    "position": "bottom",
    "list": [
      {
        "pagePath": "/pages/plIndex/plIndex",
        "text": "会诊",
        "iconPath": "/pages/images/sy.png",
        "selectedIconPath": "/pages/images/sy1.png",
        "clas": "tabbar-item",
        "active": true
      },
      {
        "pagePath": "/pages/plMine/plMine",
        "text": "我的",
        "iconPath": "/pages/images/wd.png",
        "selectedIconPath": "/pages/images/wd1.png",
        "clas": "tabbar-item",
        "active": false
      }
    ]
  }
},
  globalData: {
    userInfo: null,
    height:0,
    url:'https://www.njshangka.com/pain',
    imgUrl:'https://www.njshangka.com',
    mockUrl:'https://www.njshangka.com',
    token:'',
    loginRefresh:{},
    cookie:'',
    version:'1.0.0',
    shell:null,
  }
})
