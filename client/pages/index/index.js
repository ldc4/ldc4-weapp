const config = require('../../config');
const { host } = config.service;

Page({
  data: {
    animationDatas: [],
    mottoData: {},
    playFocus: false,
    playContent: '',
  },
  onReady: function () {
    this.aniMain();
  },
  onLoad: function (options) {
    this.getMotto();
  },
  // 动画效果
  aniMain: function () {
    const query = wx.createSelectorQuery();
    const ref = query.selectAll('.ani-init');
    ref.fields({}, (res) => {
      const animationDatas = [];
      res.forEach(function (node, index) {
        const animation = wx.createAnimation({
          duration: 200,
          delay: 200 * index,
        });
        animation.opacity(1).top(0).step();
        animationDatas.push(animation.export());
      });
      this.setData({ animationDatas });
    }).exec();
  },
  // 获取格言
  getMotto: function () {
    wx.request({
      url: `${host}/weapp/motto`,
      success: ({data, statusCode}) => {
        if (statusCode == 200 && data.code == 0) {
          const mottoData = data.data;
          this.setData({ mottoData });
        }
      },
    });
  },
  // 弹一下
  onPlayTap: function (e) {
    this.setData({
      playFocus: true,
      playContent: '',
    });
  },
  // 完成弹幕
  onPlayInputConfirm: function (e) {
    const value = e.detail.value;
    // todo 存到数据库
    console.log(value);
  },
  // 失去焦点
  onPlayInputBlur: function (e) {
    this.setData({ playFocus: false });
  }
})

