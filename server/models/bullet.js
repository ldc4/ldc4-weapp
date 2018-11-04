const { mysql } = require('../qcloud');

async function get() {
  return await mysql('bullet').select();
}

async function add(data) {
  const id = await mysql('bullet').insert(data);
  const insertData = await mysql('bullet').where('id', id).select();
  return insertData;
}

module.exports = {
  get,
  add,
}