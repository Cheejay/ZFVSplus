// pages/new/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      {
         link:'/pages/index/index',
        url:'http://10.11.124.121/1.jpg' 
      },{
         link:'/pages/logs/logs',
        url:'http://10.11.124.121/1.jpg' 
      },{
         link:'/pages/test/test',
        url:'http://10.11.124.121/1.jpg' 
      } 
   ],
   Navi: [
    {
       link:'/pages/index/index',
       imgsrc:'/images/tabbar/room.png',
       label:'身份认证'
    },{
      link:'/pages/index/index',
      imgsrc:'/images/tabbar/room.png',
      label:'身份认证'
    },{
      link:'/pages/index/index',
      imgsrc:'/images/tabbar/room.png',
      label:'身份认证'
    },{
      link:'/pages/index/index',
      imgsrc:'/images/tabbar/room.png',
      label:'身份认证'
    }
   ],
   indicatorDots: false,
   autoplay: true,
   circular: true,
   interval: 5000,
   duration: 1000,
   userInfo: {},
   //图片地址
   imgList: ['http://127.0.0.1/1.jpg', 'http://127.0.0.1/1.jpg', 'http://127.0.0.1/1.jpg', 'http://127.0.0.1/1.jpg'],
   //是否采用衔接滑动  
   circular: true,
   //是否显示画板指示点  
   indicatorDots: false,
   //选中点的颜色  
   indicatorcolor: "#000",
   //是否竖直  
   vertical: false,
   //是否自动切换  
   autoplay: true,
　　
   //所有图片的高度  （必须）
   imgheights: [],
   //图片宽度 
   imgwidth: 350,
   //默认  （必须）
   current: 0   
  },
  imageLoad: function (e) {//获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
      console.log(imgwidth, imgheight)
    //计算的高度值  
    var viewHeight = 550 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里  
    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    })
  },
  bindchange: function (e) {
    // console.log(e.detail.current)
    this.setData({ current: e.detail.current })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '珠海一职+'
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