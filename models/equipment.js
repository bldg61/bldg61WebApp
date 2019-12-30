const { query } = require('../db/index');

exports.all = async () => {
  const equipments = (await query(
    'SELECT * FROM "equipments"'
  )).rows;
  const equipmentsWithCategories = equipments.map(async equipment => {
    const categories = (await query(
      `SELECT
        categories.id,
        categories.name
      FROM categorizations, categories
      WHERE categorizations."equipmentId" = ($1)
      AND categorizations."categoryId" = categories.id;`,
      [
        equipment.id
      ]
    )).rows
    return { ...equipment, categories}
  })
  return Promise.all(equipmentsWithCategories)
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
      properties.totalForCheckout,
    ],
  )).rows[0];

  const promisedCategories = properties.categoryIds.map(async categoryId => {
    const categorization = (await query(
      `INSERT INTO "categorizations"(
        "categoryId",
        "equipmentId"
      ) values ($1, $2) returning *`,
      [
        categoryId,
        createdEquipment.id,
      ],
    )).rows[0];
    const category = (await query(
      `SELECT * FROM "categories" WHERE "id" = ($1) LIMIT 1`,
      [
        categoryId,
      ],
    )).rows[0];
    return category;
  })

  return Promise.all(promisedCategories).then(categories => {
    return { ...createdEquipment, categories };
  })
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
