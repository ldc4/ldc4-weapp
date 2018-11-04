const Motto = require('../models/motto');

// 获取格言
module.exports = async (ctx, next) => {

  // 获取数据
  const mottoList = await Motto.get();

  // 随机索引
  const max = mottoList.length - 1;
  const min = 0;
  const range = max - min;
  const random = Math.random();
  const index = min + Math.round(random * range);

  ctx.state.data = mottoList[index];
}
