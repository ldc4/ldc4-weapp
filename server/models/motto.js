const { mysql } = require('../qcloud');

console.log(mysql);
async function get(ctx, next) {
  return await mysql.select().from('motto');
}

module.exports = {
  get
}