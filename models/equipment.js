const { query } = require('../db/index');

exports.all = async () => {
  const equipments = (await query(
    'SELECT * FROM "equipments"',
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
        equipment.id,
      ],
    )).rows;
    return { ...equipment, categories };
  });

  return (await Promise.all(equipmentsWithCategories)).sort((equipmentA, equipmentB) => {
    const nameA = equipmentA.name.toUpperCase();
    const nameB = equipmentB.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
};

exports.delete = async id => {
  await query(
    `DELETE FROM "categorizations"
      WHERE "equipmentId" = $1
    returning *`,
    [
      id,
    ],
  );
  await query(
    `DELETE FROM "equipments"
      WHERE "id" = $1
    returning *`,
    [
      id,
    ],
  );
  return {};
};

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

  const categoryIds =
    properties.categoryIds === undefined ? []
    : typeof properties.categoryIds === 'string' ? [ properties.categoryIds ]
    : [ ...properties.categoryIds ];

  const promisedCategories = categoryIds.map(async categoryId => {
    await query(
      `INSERT INTO "categorizations"(
        "categoryId",
        "equipmentId"
      ) values ($1, $2) returning *`,
      [
        categoryId,
        createdEquipment.id,
      ],
    );
    const category = (await query(
      'SELECT * FROM "categories" WHERE "id" = ($1) LIMIT 1',
      [
        categoryId,
      ],
    )).rows[0];
    return category;
  });

  return Promise.all(promisedCategories).then(categories => {
    return { ...createdEquipment, categories };
  });
};

exports.find = async id => {
  const equipment = (await query(
    'SELECT * FROM "equipments" WHERE "id" = $1 LIMIT 1',
    [
      id,
    ],
  )).rows[0];
  return equipment;
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

exports.update = async newProperties => {
  const oldProps = await this.find(newProperties.id);
  const properties = { ...oldProps, ...newProperties };

  const errors = await validate(properties);
  if (errors) {
    return { errors };
  }

  const updatedEquipment = (await query(
    `UPDATE "equipments" SET
    "name"=$1,
    "totalForCheckout"=$2 WHERE id=$3 RETURNING *`,
    [
      properties.name,
      properties.totalForCheckout,
      properties.id,
    ],
  )).rows[0];

  const oldCategoryIds = (await query(
    `SELECT
      categories.id,
      categories.name
    FROM categorizations, categories
    WHERE categorizations."equipmentId" = ($1)
    AND categorizations."categoryId" = categories.id;`,
    [
      properties.id,
    ],
  )).rows.map(category => category.id);


  const newCategoryIds =
    (properties.categoryIds === undefined ? []
    : typeof properties.categoryIds === 'string' ? [ properties.categoryIds ]
    : [ ...properties.categoryIds ]).map(stringId => Number(stringId));

  const categorizationsToDelete = oldCategoryIds.filter(oldId => !newCategoryIds.includes(oldId));
  const categorizationsToCreate = newCategoryIds.filter(newId => !oldCategoryIds.includes(newId));

  categorizationsToCreate.map(async categoryId => {
    await query(
      `INSERT INTO "categorizations"(
        "categoryId",
        "equipmentId"
      ) values ($1, $2) returning *`,
      [
        categoryId,
        properties.id,
      ],
    );
  });

  await categorizationsToDelete.map(async categoryId => {
    await query(
      `DELETE FROM "categorizations"
        WHERE "categoryId" = $1
        AND "equipmentId" = $2
      returning *`,
      [
        categoryId,
        properties.id,
      ],
    );
  });

  const categories = (await query(
    `SELECT
      categories.id,
      categories.name
    FROM categorizations, categories
    WHERE categorizations."equipmentId" = ($1)
    AND categorizations."categoryId" = categories.id;`,
    [
      properties.id,
    ],
  )).rows;

  return { ...updatedEquipment, categories };
};

async function validate(properties) {
  const errors = [];
  if (properties.name === '') {
    const error = 'Name cannot be blank';
    errors.push(error);
  }
  if (properties.totalForCheckout === '') {
    const error = 'Total for checkout cannot be blank';
    errors.push(error);
  }

  const existingEquipmentName = await exports.findByName(properties.name);
  const forDifferentEquipment = existingEquipmentName
    ? existingEquipmentName.id !== Number(properties.id) : false;
  if (existingEquipmentName && forDifferentEquipment) {
    const error = 'Name already taken';
    errors.push(error);
  }

  if (errors.length > 0) {
    return errors;
  }
  return null;
}
