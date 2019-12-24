const { expect } = require('chai');

require('../helpers/testSetup');

const User = require('../../models/user');

describe('User', async () => {
  it('email must be unique', async () => {
    const user = await User.create({
      firstName: 'Elowyn',
      lastName: 'Platzer Bartel',
      email: 'elowyn@example.com',
      password: 'password',
    });

    expect(user.firstName).to.equal('Elowyn');
    expect(user.lastName).to.equal('Platzer Bartel');
    expect(user.email).to.equal('elowyn@example.com');
    expect(user.id).to.not.be.undefined; // eslint-disable-line no-unused-expressions
    expect(user.passwordDigest).to.not.be.undefined; // eslint-disable-line no-unused-expressions
    expect(user.createdAt).to.not.be.undefined; // eslint-disable-line no-unused-expressions
    expect(user.updatedAt).to.not.be.undefined; // eslint-disable-line no-unused-expressions

    const duplicateUser = await User.create({
      firstName: 'Elowyn',
      lastName: 'Platzer Bartel',
      email: 'elowyn@example.com',
      password: 'password',
    });

    expect(duplicateUser).to.deep.equal({ errors: ['Email already taken'] });
  });
});
