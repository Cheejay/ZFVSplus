const app = getApp()
import api from '../../../utils/1.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    listData: '',
    tabs: ["第一学期", "第二学期", "第三学期", "第四学期"],
    activeIndex: 0
  },
  tabClick: function (e) {
    var that = this 
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    });
    console.log(that.data.activeIndex)
    this.getTable(that.data.activeIndex)
  },
  getToday: function (todayClassName) {
    api.getToday({
      query: {
        name: todayClassName
      },
      success: (res) => {
        let todayWeek = api.todayInfo(res.data.startTime)
        this.setData({ activeIndex: todayWeek.day - 1 })
      }
    })
  },
  getTable: function (id) {
    var that = this
    var numberid = that.data.numid
    api.getTable({
      query: {
        action: [id, numberid],
      },
      success: (res) => {
        let listData = res.data
        if (listData.status == '1') {
          wx.showModal({
            content: '抱歉，未查询到当前成绩信息',
            showCancel: false,
            complete: function () {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else {
          this.setData({ listData })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this 
    this.setData({
      numid: this.options.name,
    });
    var id = that.data.activeIndex
    var numberid = that.data.activeIndex
    wx.setNavigationBarTitle({
      title: '成绩查询'
    })
 //   console.log(id)
 //   this.getToday('today')
 //   console.log(id)
    this.getTable(that.data.activeIndex)
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
      title:'成绩查询结果',
      path: '/pages/search/table/today?action=' + this.options.action + '&dept=' + this.options.dept + '&name=' + this.options.name
    }
  }
})