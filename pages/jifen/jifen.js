// jifen.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop:'',
    top:'',
    vtop:'',
    num:'display:block',
    num2:'display:block'
  },
  onChange(event) {
    console.log(event.detail, 'click right menu callback data')
  },
  //页面滚动执行方式
  
  onPageScroll(e) {
    var restop=0
    let _this = this;
    var query = wx.createSelectorQuery()
    query.select('#jies').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      restop =res[0].top
      if (res[0].top <= 0) {
        _this.setData({
          num: "display:none",
          num2: "display:none",
          top:'display:block'
        })
      } else if (res[0].top >= 0) {
        _this.setData({
          top: 'display:none'
        })
      }
    })
    

    
    if (e.scrollTop > this.data.scrollTop || e.scrollTop >= this.data.scrollHeight) {
      //向下滚动 
      
    } else {
      //向上滚动 
      this.setData({
        vtop: 'margin-top:2%',
      })
    }

    this.setData({
      scrollTop: e.scrollTop
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var p = 0;
      this.setData({
        numid: wx.getStorageSync('studentid'),
      });
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
    var _this = this
    var timn = setTimeout(function(){
      _this.setData({
        num: 'display:block;animation: roateTwo 0.5s linear;',
        num2:'display:block;animation: luti 3s linear infinite;'
      })
      wx.stopPullDownRefresh()
    },500)
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