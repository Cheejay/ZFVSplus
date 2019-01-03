// jifen.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        text: '开始吧',
      },
      {
        text: '绑定卡号',
      },
      {
        text: '绑定手机',
      },
      {
        text: '输入密码',
      },
      {
        text: '完成',
      }
    ],
    active: 0,
    id:0,
    value1:''
  },
  actives: function () {
    if (this.data.active==4){
      return
    }
    this.setData({
      active: this.data.active + 1
    })
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
        //     this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;  
        if(this.data.id){
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        }
      },
      fail: (res) => {
        wx.showToast({
          title: '扫码失败',
          icon: 'waiting',
          duration: 2000
        })
      }
    })
  } ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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