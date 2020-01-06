const { expect } = require('chai');

require('../helpers/testSetup');

const equipmentsController = require('../../controllers/equipments');

const Category = require('../../models/category');
const Equipment = require('../../models/equipment');

describe('Equipment Controller', async () => {
  it('creates categorizations with undefined, string, or array of categories', async () => {
    const category1 = await Category.create({name: 'sewing'})
    const category2 = await Category.create({name: 'electronics'})

    const req0 = {
      body: {
        name: 'airbrush',
        totalForCheckout: '0',
      },
    };
    const req1 = {
      body: {
        name: 'sewing awl',
        totalForCheckout: '0',
        categoryIds: `${category1.id}`
      },
    };
    const req2 = {
      body: {
        name: 'Adafruit GEMMA',
        totalForCheckout: '0',
        categoryIds: [`${category1.id}`, `${category2.id}`]
      },
    };

    const res = {
      redirect: (route) => {
        return { route };
      },
    };

    const res0 = await equipmentsController.create(req0, res);
    const res1 = await equipmentsController.create(req1, res);
    const res2 = await equipmentsController.create(req2, res);

    expect(res0.route).to.equal('/admin')
    expect(res1.route).to.equal('/admin')
    expect(res2.route).to.equal('/admin')

    const newEquipment0 = await Equipment.findByName(req0.body.name);
    const newEquipment1 = await Equipment.findByName(req1.body.name);
    const newEquipment2 = await Equipment.findByName(req2.body.name);
    expect(newEquipment0.categories.length).to.equal(0)
    expect(newEquipment1.categories.length).to.equal(1)
    expect(newEquipment2.categories.length).to.equal(2)
  })

  it('create returns errors without a name', async () => {
    const req = {
      body: {
        name: '',
        totalForCheckout: '',
      },
      session: {
        userId: 1,
      },
    };
    const res = {
      render: (view, object) => {
        return { view, object };
      },
    };
    const response = await equipmentsController.create(req, res);
    expect(response.view).to.equal('admin');
    expect(response.object.equipment.errors.length).to.equal(2);
    expect(response.object.equipment.errors[0]).to.equal('Name cannot be blank');
    expect(response.object.equipment.errors[1]).to.equal('Total for checkout cannot be blank');
  });

  it('update returns errors when changing name, totalForCheckout to empty string', async () => {
    const equipment = await Equipment.create({
      name: 'Laptop',
      totalForCheckout: 3,
      categoryIds:[],
    })
    const req = {
      params: {
        id: equipment.id
      },
      body: {
        name: '',
        totalForCheckout: '',
      },
      session: {
        userId: 1,
      },
    };
    const res = {
      render: (view, object) => {
        return { view, object };
      },
    };
    const response = await equipmentsController.create(req, res);
    expect(response.view).to.equal('admin');
    expect(response.object.equipment.errors.length).to.equal(2);
    expect(response.object.equipment.errors[0]).to.equal('Name cannot be blank');
    expect(response.object.equipment.errors[1]).to.equal('Total for checkout cannot be blank');
  });
});
