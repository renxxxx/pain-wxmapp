// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.hideTabBar()
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
        wx.request({
          url:vm.globalData.url + '/login-by-wxmapp',
          data:{
            code:res.code
          },
          method:'get',
          success(res){
            if(res.data.code==0){
              vm.globalData.token=res.data.data.token
              console.log(vm.globalData.token)
            }
          }
    
        })
      }
    })
    let vm=this
    wx.getSystemInfo({
      success: function (res) {

        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let changeHeight = 750 / clientWidth;
        let height = clientHeight * changeHeight;
        console.log(res,height)
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
    "color": "#dbdbdb",
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
        "text": "记录",
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
    "color": "#dbdbdb",
    "selectedColor": "#1296db",
    "backgroundColor": "white",
    "borderStyle": "white",
    "position": "bottom",
    "list": [
      {
        "pagePath": "/pages/plIndex/plIndex",
        "text": "首页",
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
    url:'https://dev.inininininin.com/pain',
    mockUrl:'https://dev.inininininin.com',
    token:''
  }
})
