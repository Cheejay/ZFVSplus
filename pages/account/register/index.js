Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["自助认证","学分制","人工授权"],
    activeIndex: 0,
    id:'',
    hide:4,
  },
  GotUserInfo: function (e) {
    var that=this
    var STUid=this.data.id
    var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);

    if (e.detail.errMsg =='getUserInfo:fail auth deny'){
      wx.showModal({
        content: '小程序需要获取识别标识请点击同意',
        showCancel: false
      })
    }else{
    if(!this.data.pwd||!this.data.Phone||!this.data.Email){
      wx.showModal({
        content: '校验失败：请确认数据输入是否完整',
        showCancel: false
      })
    }else{
      if (this.data.pwd.length <= 8 || reg.test(this.data.pwd) ==false){
        wx.request({
          url: 'https://api.lzj.im/api.php?type=Try',
          method: "POST",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          data: {
            id: this.data.id,
            pwd: this.data.pwd,
          },
          success:function (res){
          wx.showModal({
            content: '校验失败：密码长度需要为8-16个字符 不能为纯数字',
            showCancel: false
          })
        }
      })
      }else{
        if(this.data.Phone.length!==11){
          console.log(this.data.Phone.length)
          wx.showModal({
            content: '请输入正确的电话号码',
            showCancel: false
          })
        }else{
        wx.showToast({
          title: '提交中',
          icon: 'loading',
          duration: 20000
        })                     
        console.log(e.detail.userInfo)
        wx.request({
          url: 'https://api.lzj.im/api.php?type=Register',
          method: "POST",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          data: {
            id: this.data.id,
            phone:this.data.Phone,
            email:this.data.Email,
            pwd: this.data.pwd,
            nickname: e.detail.userInfo['nickName'],   
            country: e.detail.userInfo['country'],
            province: e.detail.userInfo['province'],
            city: e.detail.userInfo['city'],
            avatar: e.detail.userInfo['avatarUrl'],
            gender: e.detail.userInfo['gender'],
            language: e.detail.userInfo['language'],
            model: this.data.phoneinfo['model'],
            pixelratio: this.data.phoneinfo['pixelRatio'],
            windowwidth: this.data.phoneinfo['windowWidth'],
            windowheight: this.data.phoneinfo['windowHeight'],
            system: this.data.phoneinfo['system'],
            language: this.data.phoneinfo['language'],
            version: this.data.phoneinfo['version'],
            screenwidth: this.data.phoneinfo['screenWidth'],
            screenheight: this.data.phoneinfo['screenHeight'],
            brand: this.data.phoneinfo['brand'],
          },
          success:function (res){
            console.log(res);
            wx.hideToast()
            wx.showToast({  
              title: '认证成功',  
              icon: 'success',  
              duration: 2000  
            }) 
            wx.setStorageSync('studentid', STUid)
            that.setData({
              numid: STUid,
              scrollTop: 0
            });
          }
        }) 
      }
    }
  }    
    }
  }
  ,
  note:function(){
    this.setData({
      activeIndex: 1,
    })
  },
  note2: function () {
    this.setData({
      activeIndex: 2,
    })
  } 
  ,
  jump: function () {
    wx.navigateBack({  
      success: function() {  
        console.log("Jump!")  
      }  
    })
      
  },
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id,
    })
  },
  IdInput: function (e) {
    this.setData({
      id: e.detail.value
    })
  },
  PwdInput: function (e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  EmailInput: function (e) {
    this.setData({
      Email: e.detail.value
    })
  },
  PhoneInput: function (e) {
    this.setData({
      Phone: e.detail.value
    })
  },
  XFZidInput: function (e) {
    this.setData({
      Xfzuser: e.detail.value
    })
  },
  XFZpwdInput: function (e) {
    this.setData({
      Xfzpwd: e.detail.value
    })
  },
  Decode: function () {
    var that=this
    var data = this.data.id
    
      if (!this.data.id) {
        wx.showModal({
          content: '请输入授权码(须人工认证获取)',
          showCancel: false
        })
      } else {
        wx.request({
          url: 'https://cdn.lzj.im/authorize.php?code='+data,
          success: function (res) {
            if (res.data[0]){
            console.log(res.data)
            that.setData({
              id: res.data[1],
            })
            that.getstu(res.data[1])
            }else{
              console.log(res.data)
              console.log('Fail')
              wx.showToast({
                title: '验证失败',
                icon: 'loading',
                duration: 2000
              })  
            } 
          },
        })        
     }
  },
  XFZ: function () {
    var that=this
    var username = this.data.Xfzuser
    var pwd = this.data.Xfzpwd
    
      if (!this.data.Xfzuser && !this.data.Xfzpwd) {
        wx.showModal({
          content: '请检查用户名密码是否填写',
          showCancel: false
        })
      } else 
      {
        wx.request({
          url: 'https://api.lzj.im/api.php?type=XFZ&id='+username+'&pwd='+pwd,
          success: function (res) {
            if (res.data['num']=='1'){
            console.log(res.data)
            that.setData({
              id: username,
            })
            that.getstu(username)
            }else{
              console.log(res.data)
              console.log('Fail')
              wx.showToast({
                title: '登录失败',
                icon: 'loading',
                duration: 2000
              })  
            } 
          },
        })        
     }
  },
  Reg: function () {
    var STUid=this.data.id
    var Phone=this.data.Phone
    var PWD=this.data.pwd
    var Email=this.data.Email
    var that=this
    if(!this.data.pwd||!this.data.Phone||!this.data.Email){
      wx.showModal({
        content: '似乎你的信息没有填写完整诶',
        showCancel: false
      })
    }else{
      if(PWD.length<8){
        wx.showModal({
          content: '密码长度需要为8-16个字符 不能为纯数字',
          showCancel: false
        })
      }else{
          wx.showToast({
            title: '提交中',
            icon: 'loading',
            duration: 20000
          })
          wx.navigateTo({
            url: '../../../pages/index/index'
          })
        }
    }
  },
  scan: function () {  
    var that = this;  
    var show;  
    wx.scanCode({  
      success: (res) => {  
        console.log(res.result)
        this.setData({
          id: res.result
        })
        that.getstu(res.result)
   //     this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;  
        wx.showToast({  
          title: '成功',  
          icon: 'success',  
          duration: 2000  
        })  
      },  
      fail: (res) => {  
        wx.showToast({  
          title: '扫码失败',  
          icon: 'waitting',  
          duration: 2000  
        })  
      },  
      complete: (res) => {  
        
      }    
    })  
  }  
  ,
  getstu: function(id){
    console.log(id)
    var that = this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 20000
    })

    wx.request({
      url: 'https://cdn.lzj.im/api.php?id='+id,
      success: function (res) {
        console.log(res.data)
        that.setData({
          items: res.data,
          hide:5
        })
        wx.hideToast()
      }
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      numid: wx.getStorageSync('studentid'),
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          phoneinfo: res,
        });
      }
    })
  
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
    return {
      title: '身份认证',
      desc: '',
      path: 'pages/account/register/index'
    }
  }
})