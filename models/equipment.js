const { query } = require('../db/index');

exports.all = async () => {
  const equipments = (await query(
    'SELECT * FROM "equipments"'
  )).rows;
  return equipments
}

exports.create = async properties => {
  const errors = await validate(properties);
  if (errors) {
    return { errors };
  }

  const createdEquipment = (await query(
    `INSERT INTO "equipments"(
      "name",
      "totalForCheckout"
    ) values ($1, $2) returning *`,
    [
      properties.name,
      properties.totalForCheckout
    ],
  )).rows[0];
  return createdEquipment;
};


exports.findByName = async name => {
  const category = (await query(
    'SELECT * FROM "equipments" WHERE "name" = $1 LIMIT 1',
    [
      name,
    ],
  )).rows[0];
  return category;
};

async function validate(properties) {
  const errors = [];
  const existingEquipment = await exports.findByName(properties.name);
  if (existingEquipment) {
    const error = 'Name already taken';
    errors.push(error);
  }

  if (errors.length > 0) {
    return errors;
  }
  return null;
}
