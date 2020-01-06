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
});
