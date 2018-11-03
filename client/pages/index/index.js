const config = require('../../config');
const { randomNumber } = require('../../utils/util');
const { host } = config.service;

Page({
  data: {
    animationList: [],
    mottoData: {},
    playFocus: false,
    playContent: '',
    bulletList: [],
    bulletAnimationList: []
  },
  onReady: function () {
    this.aniMain();
    this.aniBullet();
  },
  onLoad: function (options) {
    this.getMotto();
    this.getBullet();
  },
  // 动画效果
  aniMain: function () {
    const query = wx.createSelectorQuery();
    const ref = query.selectAll('.ani-init');
    ref.fields({}, (res) => {
      const animationList = [];
      res.forEach(function (node, index) {
        const animation = wx.createAnimation({
          duration: 200,
          delay: 200 * index,
        });
        animation.opacity(1).top(0).step();
        animationList.push(animation.export());
      });
      this.setData({ animationList });
    }).exec();
  },
  // 弹幕效果
  aniBullet: function () {
    // 构造弹幕属性
    const bulletAnimationList = [];
    const bulletList = this.data.bulletList || [];
    const query = wx.createSelectorQuery();
    const ref = query.selectAll('.bullet');
    ref.fields({ dataset: true, size: true }, (res) => {
      bulletList.map((bullet, index) => {
        res.forEach(function (node, nIndex) {
          if (nIndex === index) {
            // 设置动画
            const randomDuration = randomNumber(1000, 5000);
            const animation = wx.createAnimation({
              duration: randomDuration,
            });
            animation.left(-node.width).step();
            bulletAnimationList.push(animation.export());
          }
        });
      });
      this.setData({ bulletAnimationList });
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
  // 获取弹幕
  getBullet: function () {
    // 获取内容数据 todo
    const data = [
      {
        content: '牛逼啊~',
        user: 'weedustzhao'
      },{
        content: '磊妹是个逗比'
      }, {
        content: 'Peking是个逗比'
      }, {
        content: 'ashin是个逗比'
      }
    ];
    // 获取屏幕宽度和高度
    const screenWidth = wx.getSystemInfoSync().windowWidth;
    const screenHeight = wx.getSystemInfoSync().windowHeight;
    // 构造弹幕属性
    const bulletAnimationList = [];
    const bulletList = data.map((bullet, index) => {
      const randomTop = randomNumber(0, screenHeight - 70);
      return {
        key: `bullet_${index}`,
        content: bullet.content,
        user: bullet.user,
        top: randomTop,
        left: screenWidth,
        visible: true,
      }
    });
    this.setData({ bulletList });
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

