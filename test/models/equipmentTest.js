const { expect } = require('chai');

require('../helpers/testSetup');

const Category = require('../../models/category');
const Equipment = require('../../models/equipment');

describe('Equipment', async () => {
  it('all must return all created equipment with associated categories', async () => {
    const category = await Category.create({name: 'sewing'})
    const equipment = await Equipment.create({
      name: 'sewing awl',
      totalForCheckout: 3,
      categoryIds: [category.id]
    })

    const allEquipment = await Equipment.all();
    expect(allEquipment.length).to.equal(1)
    expect(Object.keys(allEquipment[0])).to.contain('id')
    expect(Object.keys(allEquipment[0])).to.contain('name')
    expect(Object.keys(allEquipment[0])).to.contain('totalForCheckout')
    expect(Object.keys(allEquipment[0])).to.contain('createdAt')
    expect(Object.keys(allEquipment[0])).to.contain('updatedAt')
    expect(Object.keys(allEquipment[0])).to.contain('categories')

    expect(allEquipment[0].categories.length).to.equal(1)
    expect(Object.keys(allEquipment[0].categories[0])).to.contain('id')
    expect(allEquipment[0].categories[0].name).to.equal('sewing')
  })

  it('create defaults totalForCheckout to zero', async () => {
    const equipmentEmptyTFC = await Equipment.create({
      name: 'sewing awl',
      totalForCheckout: '',
      categoryIds: []
    })
    const equipmentMissingTFC = await Equipment.create({
      name: 'ironing board',
      categoryIds: []
    })

    expect(equipmentEmptyTFC.totalForCheckout).to.equal(0)
    expect(equipmentMissingTFC.totalForCheckout).to.equal(0)
  })

  it('create returns errors when no name is supplied', async () => {
    const equipmentMissingName = await Equipment.create({ })
    const equipmentEmptyName = await Equipment.create({
      name: '',
    })
    expect(Object.keys(equipmentMissingName)).to.contain('errors');
    expect(Object.keys(equipmentMissingName)).to.contain('properties');
    expect(Object.keys(equipmentEmptyName)).to.contain('errors');
    expect(Object.keys(equipmentEmptyName)).to.contain('properties');
    expect(equipmentMissingName.errors.length).to.equal(1);
    expect(equipmentMissingName.errors[0]).to.equal('Name cannot be blank');
    expect(equipmentEmptyName.errors.length).to.equal(1);
    expect(equipmentEmptyName.errors[0]).to.equal('Name cannot be blank');
  })

  it('update returns errors when no name is supplied', async () => {
    const equipment = await Equipment.create({
      name: 'Sewing Machine',
      categoryIds: [],
    })
    const equipmentEmptyName = await Equipment.update({
      ...equipment,
      name: '',
    })
    expect(Object.keys(equipmentEmptyName)).to.contain('errors');
    expect(Object.keys(equipmentEmptyName)).to.contain('properties');
    expect(equipmentEmptyName.errors.length).to.equal(1);
    expect(equipmentEmptyName.errors[0]).to.equal('Name cannot be blank');
  })
});
