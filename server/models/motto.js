const { mysql } = require('../qcloud');

async function get() {
  return await mysql.select().from('motto');
}

module.exports = {
  get
}