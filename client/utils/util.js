const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const randomNumber = (min, max) => {
  const range = max - min;
  const random = Math.random();
  return min + Math.round(random * range);
}

const getUser = (userInfo = {}) => {
  try {
    const userObj = JSON.parse(userInfo);
    return userObj && userObj.nickName || '';
  } catch (e) {
    // 用户数据解析错误
  }
  return '';
}

// 显示繁忙提示
const showBusy = (text, options = {}) => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000,
  ...options
});

// 显示成功提示
const showSuccess = (text, options = {}) => wx.showToast({
  title: text,
  icon: 'success',
  ...options
});

// 显示普通信息
const showToast = (text, options = {}) => wx.showToast({
  title: text,
  icon: 'none',
  ...options
});

// 显示失败提示
const showModal = (title, content, options = {}) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false,
    ...options
  });
};

module.exports = { randomNumber, getUser, formatTime, showBusy, showSuccess, showToast, showModal }
