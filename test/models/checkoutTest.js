const { expect } = require('chai');

require('../helpers/testSetup');

const Category = require('../../models/category');
const Checkout = require('../../models/checkout');
const Tool = require('../../models/tool');

const getTodaysCheckoutDueDate = require('../../lib/getTodaysCheckoutDueDate');

describe('Checkouts', async () => {
  it('require patron name, patron contact, due date, and tool', async () => {
    const category = await Category.create({ name: 'sewing' });
    await Tool.create({
      name: 'sewing awl',
      totalForCheckout: 3,
      categoryIds: [category.id],
    });
    const checkout = await Checkout.create({})

    expect(checkout.errors.length).to.equal(4);
    expect(checkout.errors).to.contain('Patron Name cannot be blank')
    expect(checkout.errors).to.contain('Patron Contact cannot be blank')
    expect(checkout.errors).to.contain('Due Date cannot be blank')
    expect(checkout.errors).to.contain('Valid tool for checkout must be selected')
  });
  it('requires valid tool id', async () => {
    const category = await Category.create({ name: 'sewing' });
    const tool = await Tool.create({
      name: 'sewing awl',
      totalForCheckout: 3,
      categoryIds: [category.id],
    });
    const checkout = await Checkout.create({
      patronName: 'Adam',
      patronContact: '1-900-Mix-A-Lot',
      dueDate: await getTodaysCheckoutDueDate(),
      toolId: tool.id + 100
    })

    expect(checkout.errors).to.contain('Valid tool for checkout must be selected')
  });
});
