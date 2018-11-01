const mysql = require('../tools/mysql/index')

// 获取格言
module.exports = async (ctx, next) => {
  // todo 通过数据库获取数据
  const motto = [
    {
      "quote": {
        "text": "从零开始，斗破苍穹，七界传说",
        "author": "——源自小说名"
      }
    },
    {
      "quote": {
        "text": "天道酬勤",
        "author": ""
      }
    },
    {
      "quote": {
        "text": "消失的夜月，迟到的凌辰。",
        "author": ""
      }
    },
    {
      "quote": {
        "text": "你学习一门技术的最佳时机是三年前，其次是现在。",
        "author": ""
      }
    },
    {
      "quote": {
        "text": "Don't give up!",
        "author": ""
      }
    },
    {
      "quote": {
        "text": "学如逆水行舟，不进则退<br>心似平原走马，易放难收",
        "author": "——《增广贤文》"
      }
    },
    {
      "quote": {
        "text": "成不了药就成为毒，不然你只是普通的水而已。",
        "author": "——卧烟远江 《花物语》"
      }
    },
    {
      "quote": {
        "text": "愿一直努力",
        "author": ""
      }
    },
    {
      "quote": {
        "text": "天道酬勤，越努力，越幸运！",
        "author": ""
      }
    }
  ];

  // 随机索引
  const max = motto.length - 1;
  const min = 0;
  const range = max - min;
  const random = Math.random();
  const index = min + Math.round(random * range);

  ctx.state.data = motto[index];
}
