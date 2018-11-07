const qcloud = require('../../vendor/wafer2-client-sdk/index');
const config = require('../../config');
const { colors } = require('./constant');
const { randomNumber, getUser, showBusy, showSuccess, showModal } = require('../../utils/util');
const { host } = config.service;



Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    logged: false,                // 登录态
    userInfo: {},                 // 用户信息
    firstPage: true,              // 第一次进入
    animationList: [],            // 主页面动画
    mottoData: {},                // 格言数据
    playFocus: false,             // 弹一下输入框焦点
    playContent: '',              // 弹一下内容
    bulletList: [],               // 弹幕数据
    bulletAnimationList: [],      // 弹幕动画
    newBulletList: [],            // 新添加的弹幕数据
    newBulletAnimationList: [],   // 新添加的弹幕动画
  },
  onLoad: function (options) {
    this.getMotto(this.aniMain);
    this.getBullet(this.aniBullet);
  },
  onReady: function () {
    this.setData({ firstPage: false });
  },
  onShow: function () {
    if (!this.data.firstPage) {
      // 重置数据
      this.setData({
        bulletList: [],               // 弹幕数据
        bulletAnimationList: [],      // 弹幕动画
        newBulletList: [],            // 新添加的弹幕数据
        newBulletAnimationList: [],   // 新添加的弹幕动画
      }, () => {
        this.getBullet(this.aniBullet);
      });
    }
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
            const randomDelay = randomNumber(500, res.length * 1000 / 2);
            const animation = wx.createAnimation({
              duration: randomDuration,
              delay: randomDelay,
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
  getMotto: function (callback) {
    wx.request({
      url: `${host}/weapp/motto`,
      success: ({data, statusCode}) => {
        if (statusCode == 200 && data.code == 0) {
          const mottoData = data.data;
          this.setData({ mottoData }, callback);
        }
      },
    });
  },
  // 获取弹幕
  getBullet: function (callback) {
    wx.request({
      url: `${host}/weapp/bullet`,
      success: ({ data, statusCode }) => {
        if (statusCode == 200 && data.code == 0) {
          const bulletData = data.data;
          // 获取屏幕宽度和高度
          const screenWidth = wx.getSystemInfoSync().windowWidth;
          const screenHeight = wx.getSystemInfoSync().windowHeight;
          // 构造弹幕属性
          const bulletAnimationList = [];
          const bulletList = bulletData.map((bullet) => {
            const randomTop = randomNumber(0, screenHeight - 24); // 减去弹幕的高度
            const randomColorIndex = randomNumber(0, 23);
            const user = getUser(bullet.userInfo);
            return {
              key: `bullet_${bullet.id}`,
              content: bullet.content,
              user,
              top: randomTop,
              left: screenWidth + 10, // 留点距离，避免英文会露出一点
              color: colors[randomColorIndex],
              visible: true,
            }
          });
          this.setData({ bulletList }, callback);
        }
      },
    });
  },
  // 完成弹幕
  onPlayInputConfirm: function (e) {
    const value = e.detail.value;
    const userInfo = this.data.userInfo || {};
    wx.request({
      url: `${host}/weapp/bullet`,
      method: 'POST',
      data: {
        content: value,
        userInfo: JSON.stringify(userInfo),
      },
      success: ({ data, statusCode }) => {
        if (statusCode == 200 && data.code == 0) {
          const insertedBullet = data.data[0];
          // 添加节点
          const newBulletList = this.data.newBulletList;
          const screenWidth = wx.getSystemInfoSync().windowWidth;
          const screenHeight = wx.getSystemInfoSync().windowHeight;
          const randomTop = randomNumber(0, screenHeight - 24);
          const randomColorIndex = randomNumber(0, 23);
          const user = getUser(insertedBullet.userInfo);
          newBulletList.push({
            key: `bullet_${insertedBullet.id}`,
            content: insertedBullet.content,
            user,
            top: randomTop,
            left: screenWidth + 10,
            color: colors[randomColorIndex],
            visible: true,
          });
          this.setData({ newBulletList }, () => {
            // 添加动画
            const newBulletAnimationList = this.data.newBulletAnimationList;
            const query = wx.createSelectorQuery();
            const ref = query.selectAll('.new-bullet');
            ref.fields({ dataset: true, size: true }, (res) => {
              console.log(res);
              const node = res[res.length - 1];
              const animation = wx.createAnimation({
                duration: 5000,
              });
              animation.left(-node.width).step();
              newBulletAnimationList.push(animation.export());
              this.setData({ newBulletAnimationList });
            }).exec();
          });
        }
      },
    });
  },
  // 失去焦点
  onPlayInputBlur: function (e) {
    this.setData({ playFocus: false });
  },
  // 弹一下
  onPlayTap: function (e) {
    const { type } = e.target && e.target.dataset || {};
    const { nickName } = e.detail && e.detail.userInfo || {};
    if (type === 'login') {
      this.onLogin(!!nickName, () => {
        this.setData({
          playFocus: true,
          playContent: '',
        });
      });
    } else {
      this.setData({
        playFocus: true,
        playContent: '',
      });
    }
  },
  // 登录鉴权
  onLogin: function(isAllowed, callback) {
    if (this.data.logged) {
      callback();
      return;
    }
    if (!isAllowed) {
      showModal('登录失败', '使用匿名', {
        confirmText: '明白',
        complete: callback,
      });
      return;
    }
    showBusy('正在登录...');
    const session = qcloud.Session.get()
    if (session) {
      // 第二次登录
      // 或者本地已经有登录态
      // 可使用本函数更新登录态
      qcloud.loginWithCode({
        success: res => {
          this.setData({ userInfo: res, logged: true })
          showSuccess('登录成功', { complete: callback });
        },
        fail: err => {
          console.error(err)
          showModal('登录失败', '使用匿名', {
            confirmText: '明白',
            complete: callback,
          });
        }
      })
    } else {
      // 首次登录
      qcloud.login({
        success: res => {
          this.setData({ userInfo: res, logged: true })
          showSuccess('登录成功', { complete: callback });
        },
        fail: err => {
          console.error(err)
          showModal('登录失败', '使用匿名', {
            confirmText: '明白',
            complete: callback,
          });
        }
      })
    }
  },
})

