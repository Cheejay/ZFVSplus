const app = getApp()
import api from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:[],
    listData: '',
    tabs: ["第一学期", "第二学期", "第三学期", "第四学期"],
    activeIndex: 0
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  getTable: function (options) {
    console.log('getTable')
    console.log('e.currentTarget.id')
    api.getTable({
      query: {
        action: options.action,
        dept: options.dept ? options.dept : options.action,
        name: options.name
      },
      success: (res) => {
        let listData = res.data
        if (listData.status == '1') {
          wx.showModal({
            content: '抱歉，未查询到当前课表信息',
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
    var _this = this
    wx.setNavigationBarTitle({
      title: ' 成绩查询'
    })
    wx.request({
      url: 'https://cdn.lzj.im/score.php?master=1',
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        _this.setData({
          score: res.data
        })
      }
    })
    this.getTable(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
console.log('Onshow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title:'成绩查询',
      path: '/pages/search/table/today?action=' + this.options.action + '&dept=' + this.options.dept + '&name=' + this.options.name
    }
  }
})