const app = getApp()
import api from '../../utils/util.js'

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    board: '',
    studentid:'none',
    current: 'homepage',
    today: '', //今日课程
    todayWeek: '', //开学周期 week周 day星期
    theDay: '', //今日时间
    todayClassName: '' //今日课程班级
  },
  getToday: function (todayClassName) {
    api.getToday({
      query: {
        name: todayClassName
      },
      success: (res) => {
        let today = res.data
        let todayWeek = api.todayInfo(res.data.startTime)
        this.setData({ today, todayWeek })
      },
      fail: (res) => {
        let today = 'error'
        this.setData({ today })
      },
      complete: (res) => {
        let theDay = api.getDate() + api.getDay()
        this.setData({ theDay })
      }
    })
  },
  handleChange ({ detail }) {
    console.log(detail)
    this.setData({
        current: detail.key
    });
    if (detail.key === 'score') {
      wx.navigateTo({
        url: '../search/table/today'
      })
    }
    if (detail.key === 'credit') {
      wx.navigateTo({
        url: '../search/credit/today'
      })
    }
  },
  toHelp: function () {
    wx.setStorageSync('help', '1')
    wx.navigateTo({
      url: '../more/help'
    })
  },
  Register: function () {
    wx.navigateTo({
      url: '../account/register/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    let help = wx.getStorageSync('help') ? wx.getStorageSync('help') : 'none';
    let todayClassName = wx.getStorageSync('todayClassName') ? wx.getStorageSync('todayClassName') : 'none';
    let studentid = wx.getStorageSync('studentid') ? wx.getStorageSync('studentid') : 'none';
    this.getToday(todayClassName)
    this.setData({ help, todayClassName ,studentid })
    wx.request({
      url: 'https://api.lzj.im/boar1d.php',
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        _this.setData({
          board: res.data.info
        })
      },
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
    this.setData({
        current: 'homepage'
    });
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
    wx.reLaunch({
      url: 'index'
    })
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
      title: '珠海一职+',
      desc: '这是一个查成绩的小程序',
      path: '/pages/index/index'
    }
  }
})