const { expect } = require('chai');

require('../helpers/testSetup');

const equipmentsController = require('../../controllers/equipments');
const Equipment = require('../../models/equipment');

describe('Equipment Controller', async () => {
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
