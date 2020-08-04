const bcrypt = require('bcryptjs');

const { query } = require('../db/index');

exports.authenticate = async credentials => {
  const user = (await query('SELECT * FROM "users" WHERE "email" = $1', [
    credentials.email,
  ])).rows[0];

  const valid = user
    ? await bcrypt.compare(credentials.password, user.passwordDigest)
    : false;

  if (valid) {
    return user;
  }
  return { errors: ['Email or Password is incorrect'] };
};

exports.create = async properties => {
  const errors = await validate(properties);
  if (errors) {
    return { errors };
  }

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const passwordDigest = bcrypt.hashSync(properties.password, salt);

  const createdUser = (await query(
    `INSERT INTO "users"(
      "firstName",
      "lastName",
      "email",
      "passwordDigest"
    ) values ($1, $2, $3, $4) returning *`,
    [
      properties.firstName,
      properties.lastName,
      properties.email,
      passwordDigest,
    ],
  )).rows[0];
  return createdUser;
};

exports.find = async id => {
  if (!id) return;
  const user = (await query(
    'SELECT * FROM "users" WHERE "id" = $1 LIMIT 1',
    [
      id,
    ],
  )).rows[0];
  return user;
};

exports.findByEmail = async email => {
  const user = (await query(
    'SELECT * FROM "users" WHERE "email" = $1 LIMIT 1',
    [
      email,
    ],
  )).rows[0];
  return user;
};

async function validate(properties) {
  const errors = [];
  const existingEmailUser = await exports.findByEmail(properties.email);
  if (existingEmailUser) {
    const error = 'Email already taken';
    errors.push(error);
  }

  if (errors.length > 0) {
    return errors;
  }
  return null;
}
