const { query } = require('../db/index');

exports.create = async properties => {
  const errors = await validate(properties);
  if (errors) {
    return { errors };
  }

  const createdCategory = (await query(
    `INSERT INTO "categories"(
      "name"
    ) values ($1) returning *`,
    [
      properties.name,
    ],
  )).rows[0];
  return createdCategory;
};


exports.findByName = async name => {
  const category = (await query(
    'SELECT * FROM "categories" WHERE "name" = $1 LIMIT 1',
    [
      name,
    ],
  )).rows[0];
  return category;
};

async function validate(properties) {
  const errors = [];
  const existingCategory = await exports.findByName(properties.name);
  if (existingCategory) {
    const error = 'Name already taken';
    errors.push(error);
  }

  if (errors.length > 0) {
    return errors;
  }
  return null;
}
