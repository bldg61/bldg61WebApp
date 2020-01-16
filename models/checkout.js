const { query } = require('../db/index');

exports.all = async () => {
  const checkouts = (await query(
    `SELECT
      checkouts."patronName",
      checkouts."patronContact",
      checkouts."dueDate",
      checkouts."toolId",
      tools."name" as "toolName"
    FROM "checkouts", tools
    WHERE checkouts."toolId" = tools.id`,
  )).rows;
  return checkouts
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

async function validate(properties) {
  const errors = [];

  if (errors.length > 0) {
    return errors;
  }
  return null;
}
