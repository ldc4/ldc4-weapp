const config = require('../../config');
const { host } = config.service;

Page({
  data: {
    animationDatas: [],
    mottoData: {
      quote: {},
    },
  },
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
  onShow: function () {
    this.aniMain();
  },
  onLoad: function (options) {
    this.getMotto();
  },
})

