const { expect } = require('chai');

require('../helpers/testSetup');

const Category = require('../../models/category');
const Tool = require('../../models/tool');

describe('Tool', async () => {
  it('all must return all created tools with associated categories', async () => {
    const category = await Category.create({ name: 'sewing' });
    await Tool.create({
      name: 'sewing awl',
      totalForCheckout: 3,
      categoryIds: [category.id],
    });

    const tools = await Tool.all();
    expect(tools.length).to.equal(1);
    expect(Object.keys(tools[0])).to.contain('id');
    expect(Object.keys(tools[0])).to.contain('name');
    expect(Object.keys(tools[0])).to.contain('totalForCheckout');
    expect(Object.keys(tools[0])).to.contain('createdAt');
    expect(Object.keys(tools[0])).to.contain('updatedAt');
    expect(Object.keys(tools[0])).to.contain('categories');

    expect(tools[0].categories.length).to.equal(1);
    expect(Object.keys(tools[0].categories[0])).to.contain('id');
    expect(tools[0].categories[0].name).to.equal('sewing');
  });

  it('create defaults totalForCheckout to zero', async () => {
    const toolEmptyTFC = await Tool.create({
      name: 'sewing awl',
      totalForCheckout: '',
      categoryIds: [],
    });
    const toolMissingTFC = await Tool.create({
      name: 'ironing board',
      categoryIds: [],
    });

    expect(toolEmptyTFC.totalForCheckout).to.equal(0);
    expect(toolMissingTFC.totalForCheckout).to.equal(0);
  });

  it('create returns errors when no name is supplied', async () => {
    const toolMissingName = await Tool.create({ });
    const toolEmptyName = await Tool.create({
      name: '',
    });
    expect(Object.keys(toolMissingName)).to.contain('errors');
    expect(Object.keys(toolMissingName)).to.contain('properties');
    expect(Object.keys(toolEmptyName)).to.contain('errors');
    expect(Object.keys(toolEmptyName)).to.contain('properties');
    expect(toolMissingName.errors.length).to.equal(1);
    expect(toolMissingName.errors[0]).to.equal('Name cannot be blank');
    expect(toolEmptyName.errors.length).to.equal(1);
    expect(toolEmptyName.errors[0]).to.equal('Name cannot be blank');
  });

  it('update returns errors when no name is supplied', async () => {
    const tool = await Tool.create({
      name: 'Sewing Machine',
      categoryIds: [],
    });
    const toolEmptyName = await Tool.update({
      ...tool,
      name: '',
    });
    expect(Object.keys(toolEmptyName)).to.contain('errors');
    expect(Object.keys(toolEmptyName)).to.contain('properties');
    expect(toolEmptyName.errors.length).to.equal(1);
    expect(toolEmptyName.errors[0]).to.equal('Name cannot be blank');
  });
});
