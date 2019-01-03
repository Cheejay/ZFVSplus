import api from '../../../utils/1.js'
//获取应用实例    
var app = getApp()  
Page({  
  data: {  
    listData: '',
    show: "当前学号",  
  },  

  onLoad: function () {  
  },


  formBindsubmit: function (e) {
      this.setData({
        tip: '',
        userName: '用户名：' + e.detail.value.phone,
        psw: '密码：' + e.detail.value.pwd
      })
  },
  formReset: function () {
    this.setData({
      tip: '',
      userName: '',
      psw: ''
    })
  }
  ,







  getstu: function(){
    var that = this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })

    setTimeout(function () {
      wx.request({
        url: 'https://cdn.lzj.im/api.php?id=162010021',
        success: function (res) {
          console.log(res.data)
          that.setData({
            items: res.data
          })
        }
      })

      wx.hideToast()
    })

  },
  click: function () {  
    var that = this;  
    var show;  
    wx.scanCode({  
      success: (res) => {  
        this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;  
        that.setData({  
          show: this.show  
        })  
        wx.showToast({  
          title: '成功',  
          icon: 'success',  
          duration: 2000  
        })  
      },  
      fail: (res) => {  
        wx.showToast({  
          title: '失败',  
          icon: 'error',  
          duration: 2000  
        })  
      },  
      complete: (res) => {  
      }    
    })  
  }  
})  