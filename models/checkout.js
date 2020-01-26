const { query } = require('../db/index');

const Tool = require('./tool.js');

exports.all = async () => {
  const checkouts = (await query(
    `SELECT
      checkouts.id,
      checkouts."patronName",
      checkouts."patronContact",
      checkouts."dueDate",
      checkouts."toolId",
      checkouts."returned",
      tools."name" as "toolName"
    FROM "checkouts", tools
    WHERE checkouts."toolId" = tools.id`,
  )).rows;
  return checkouts;
};

exports.create = async properties => {
  const errors = await validate(properties);
  if (errors) {
    return { errors, properties };
  }

  const createdCheckout = (await query(
    `INSERT INTO "checkouts"(
      "patronName",
      "patronContact",
      "dueDate",
      "toolId"
    ) values ($1, $2, $3, $4) returning *`,
    [
      properties.patronName,
      properties.patronContact,
      properties.dueDate,
      properties.toolId,
    ],
  )).rows[0];
  return createdCheckout;
};

exports.delete = async id => {
  await query(
    `DELETE FROM "checkouts"
      WHERE "id" = $1
    returning *`,
    [
      id,
    ],
  );
  return {};
};

exports.find = async id => {
  const checkout = (await query(
    'SELECT * FROM "checkouts" WHERE "id" = $1 LIMIT 1',
    [
      id,
    ],
  )).rows[0];
  return checkout;
};

exports.update = async newProperties => {
  const oldProps = await this.find(newProperties.id);
  const properties = { ...oldProps, ...newProperties };

  const errors = await validate(properties);
  if (errors) {
    return { errors, properties };
  }

  const updatedCheckout = (await query(
    `UPDATE "checkouts" SET
    "patronName"=$1,
    "patronContact"=$2,
    "dueDate"=$3,
    "toolId"=$4,
    "returned"=$5,
    "updatedAt"=current_timestamp WHERE id=$6 RETURNING *`,
    [
      properties.patronName,
      properties.patronContact,
      properties.dueDate,
      properties.toolId,
      properties.returned ? new Date() : undefined,
      properties.id,
    ],
  )).rows[0];

  return updatedCheckout;
};

exports.wherePatronContact = async patronContact => {
  const checkout = (await query(
    'SELECT * FROM "checkouts" WHERE "patronContact" = $1',
    [
      patronContact,
    ],
  )).rows[0];
  return checkout;
};

async function validate(properties) {
  const errors = [];

  if (!properties.patronName || properties.patronName === '') {
    const error = 'Patron Name cannot be blank';
    errors.push(error);
  }

  if (!properties.patronContact || properties.patronContact === '') {
    const error = 'Patron Contact cannot be blank';
    errors.push(error);
  }

  if (!properties.dueDate || properties.dueDate === '') {
    const error = 'Due Date cannot be blank';
    errors.push(error);
  }

  if (!properties.toolId || !(await Tool.find(properties.toolId))) {
    const error = 'Valid tool for checkout must be selected';
    errors.push(error);
  }

  if (errors.length > 0) {
    return errors;
  }
  return null;
}
