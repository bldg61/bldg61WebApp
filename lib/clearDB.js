const { query } = require('../db/index');

module.exports = async () => {
  await query('delete from "equipments"');
  await query('delete from "categories"');
  await query('delete from "session"');
  await query('delete from "users"');
};
