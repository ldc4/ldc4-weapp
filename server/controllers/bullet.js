const Bullet = require('../models/bullet');
const tencentcloud = require('tencentcloud-sdk-nodejs');
const config = require('../config')

async function get(ctx, next) {
  // 获取数据
  const bulletList = await Bullet.get();
  ctx.state.data = bulletList;
}

// 数据校验并做数据处理
async function formatBullet(body) {
  const data = {
    content: body.content,
  };
  if (!data.content) { return '内容不能为空！' }
  // 请求腾讯云的文本审核
  // ----------------
  // 导入对应产品模块的client models。
  const NlpClient = tencentcloud.nlp.v20190408.Client;
  const NlpModels = tencentcloud.nlp.v20190408.Models;
  // 实例化一个认证对象，入参需要传入腾讯云账户secretId，secretKey
  const Credential = tencentcloud.common.Credential;
  let cred = new Credential(config.qcloudSecretId, config.qcloudSecretKey);
  // 实例化要请求产品的client对象
  let client = new NlpClient(cred, "ap-guangzhou");
  // 实例化一个请求对象
  let req = new NlpModels.TextApprovalRequest();
  req.Text = data.content;
  // 通过client对象调用想要访问的接口，需要传入请求对象以及响应回调函数
  const promise = new Promise((resolve, reject) => {
    client.TextApproval(req, function (err, response) {
      // 请求异常返回，打印异常信息
      if (err) {
        console.log(err);
        return;
      }
      // 请求正常返回，打印response对象
      if (response.EvilTokens && response.EvilTokens.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  })
  const isInvalid = await promise.then(value => value)
  if (isInvalid) {
    return '不合适的言论~';
  } else {
    return data;
  }
}

async function post(ctx, next) {
  const body = ctx.request.body;
  const data = await formatBullet(body);
  if (data instanceof Object) {
    ctx.state.data = await Bullet.add(body);
  } else {
    ctx.state.code = -1;
    ctx.state.msg = data;
  }
}

// 获取格言
module.exports = { get, post }
