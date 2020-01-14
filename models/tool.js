const { query } = require('../db/index');

const sortByObjectName = require('../lib/sortByObjectName');

exports.all = async () => {
  const tools = (await query(
    `SELECT
      equipments."id",
      equipments."name",
      equipments."totalForCheckout",
      equipments."createdAt",
      equipments."updatedAt",
      ARRAY(
        SELECT json_build_object('id', categories.id, 'name', categories.name)
        FROM categorizations, categories
          WHERE categories.id = categorizations."categoryId"
          AND equipments.id = categorizations."equipmentId") as categories
    FROM equipments`,
  )).rows;

  return tools.sort(sortByObjectName);
};

exports.create = async properties => {
  const errors = await validate(properties);
  if (errors) {
    return { errors, properties };
  }

  const createdTool = (await query(
    `INSERT INTO "equipments"(
      "name",
      "totalForCheckout"
    ) values ($1, $2) returning *`,
    [
      properties.name,
      properties.totalForCheckout || 0,
    ],
  )).rows[0];

  const promisedCategories = properties.categoryIds.map(async categoryId => {
    await query(
      `INSERT INTO "categorizations"(
        "categoryId",
        "equipmentId"
      ) values ($1, $2) returning *`,
      [
        categoryId,
        createdTool.id,
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
    return { ...createdTool, categories };
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

exports.find = async id => {
  const tool = (await query(
    'SELECT * FROM "equipments" WHERE "id" = $1 LIMIT 1',
    [
      id,
    ],
  )).rows[0];
  return tool;
};

exports.findByName = async name => {
  const category = (await query(
    `SELECT
      equipments."id",
      equipments."name",
      equipments."totalForCheckout",
      equipments."createdAt",
      equipments."updatedAt",
      ARRAY(
        SELECT json_build_object('id', categories.id, 'name', categories.name)
        FROM categorizations, categories
          WHERE categories.id = categorizations."categoryId"
          AND equipments.id = categorizations."equipmentId") as categories
    FROM equipments WHERE "name"=$1`,
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

  const updatedTool = (await query(
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
    : typeof properties.categoryIds === 'string' ? [properties.categoryIds]
    : [...properties.categoryIds]).map(stringId => Number(stringId));

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

  return { ...updatedTool, categories };
};

async function validate(properties) {
  const errors = [];
  if (!properties.name || properties.name === '') {
    const error = 'Name cannot be blank';
    errors.push(error);
  }

  const existingToolName = await exports.findByName(properties.name);
  const forDifferentTool = existingToolName
    ? existingToolName.id !== Number(properties.id) : false;
  if (existingToolName && forDifferentTool) {
    const error = 'Name already taken';
    errors.push(error);
  }

  if (errors.length > 0) {
    return errors;
  }
  return null;
}
