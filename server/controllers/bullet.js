const Bullet = require('../models/bullet');

async function get(ctx, next) {
  // 获取数据
  const bulletList = await Bullet.get();
  ctx.state.data = bulletList;
}

// 数据校验并做数据处理
function formatBullet(body) {
  const data = {
    content: body.content,
  };
  if (!data.content) { return '内容不能为空！' }
  return data;
}

async function post(ctx, next) {
  const body = ctx.request.body;
  const data = formatBullet(body);
  if (data instanceof Object) {
    ctx.state.data = await Bullet.add(body);
  } else {
    ctx.state.code = -1;
    ctx.state.err = data;
  }
}

// 获取格言
module.exports = { get, post }
