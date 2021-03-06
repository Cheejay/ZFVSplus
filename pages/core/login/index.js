const app = getApp()
import api from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: ''
  },
  stuNUMInput: function (e) {
    this.setData({
      stuNUM: e.detail.value
    })
  },
  getLibList: function (stuid) {
    var that=this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    wx.navigateTo({
      url: "login"
    })
    /*
    wx.request({
      url: 'https://cdn.lzj.im/birth.php?id='+stuid,
      data: {
      },
      success: function (res) {
        wx.hideToast()
        console.log(res.data)
        that.setData({
          info: res
        })
      }
    })
    */
     
  },
  search: function () {
    if (!this.data.stuNUM) {
      wx.showModal({
        content: '请输入学号',
        showCancel: false
      })
    } else {
      this.getLibList(this.data.stuNUM)
    }
  },

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