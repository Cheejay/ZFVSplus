const app = getApp()
import api from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: ''
  },
  bookNameInput: function (e) {
    this.setData({
      bookName: e.detail.value
    })
  },
  getLibList: function (stuid) {
    var that=this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
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
     
  },
  search: function () {
    if (!this.data.bookName) {
      wx.showModal({
        content: '请输入学号',
        showCancel: false
      })
    } else {
      this.getLibList(this.data.bookName)
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
    return {
      title: '学校里的另一个你',
      desc: '查找本校与你同一个出生日期的小伙伴',
      path: '/pages/core/lib/index'
    }
  }
})