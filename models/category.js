const { query } = require('../db/index');

const sortByObjectName = require('../lib/sortByObjectName');

exports.all = async () => {
  const categories = (await query(
    'SELECT * FROM "categories"',
  )).rows;
  return categories.sort(sortByObjectName);
};

exports.create = async properties => {
  const errors = await validate(properties);
  if (errors) {
    return { errors, properties };
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

exports.delete = async id => {
  await query(
    `DELETE FROM "categorizations"
      WHERE "categoryId" = $1
    returning *`,
    [
      id,
    ],
  );
  await query(
    `DELETE FROM "categories"
      WHERE "id" = $1
    returning *`,
    [
      id,
    ],
  );
  return {};
};

exports.find = async id => {
  const category = (await query(
    'SELECT * FROM "categories" WHERE "id" = $1 LIMIT 1',
    [
      id,
    ],
  )).rows[0];
  return category;
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

exports.update = async newProperties => {
  const oldProps = await this.find(newProperties.id);
  const properties = { ...oldProps, ...newProperties };

  const errors = await validate(properties);
  if (errors) {
    return { errors, properties };
  }

  const updatedCategory = (await query(
    `UPDATE "categories" SET
    "name"=$1 WHERE id=$2 RETURNING *`,
    [
      properties.name,
      properties.id,
    ],
  )).rows[0];

  return updatedCategory;
};

async function validate(properties) {
  const errors = [];

  if (!properties.name || properties.name === '') {
    const error = 'Name cannot be blank';
    errors.push(error);
  }

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
