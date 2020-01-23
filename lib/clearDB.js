const { query } = require('../db/index');

module.exports = async () => {
  await query('delete from "checkouts"');
  await query('delete from "categorizations"');
  await query('delete from "tools"');
  await query('delete from "categories"');
  await query('delete from "session"');
  await query('delete from "users"');
};
