const { expect } = require('chai');

require('../helpers/testSetup');

const Category = require('../../models/category');

describe('Category', async () => {
  it('create returns errors when no name is supplied', async () => {
    const categoryMissingName = await Category.create({ });
    const categoryEmptyName = await Category.create({
      name: '',
    });
    expect(Object.keys(categoryMissingName)).to.contain('errors');
    expect(Object.keys(categoryMissingName)).to.contain('properties');
    expect(Object.keys(categoryEmptyName)).to.contain('errors');
    expect(Object.keys(categoryEmptyName)).to.contain('properties');
    expect(categoryMissingName.errors.length).to.equal(1);
    expect(categoryMissingName.errors[0]).to.equal('Name cannot be blank');
    expect(categoryEmptyName.errors.length).to.equal(1);
    expect(categoryEmptyName.errors[0]).to.equal('Name cannot be blank');
  });

  it('update returns errors when no name is supplied', async () => {
    const category = await Category.create({
      name: 'Sewing',
    });
    const categoryEmptyName = await Category.update({
      ...category,
      name: '',
    });
    expect(Object.keys(categoryEmptyName)).to.contain('errors');
    expect(Object.keys(categoryEmptyName)).to.contain('properties');
    expect(categoryEmptyName.errors.length).to.equal(1);
    expect(categoryEmptyName.errors[0]).to.equal('Name cannot be blank');
  });
});
