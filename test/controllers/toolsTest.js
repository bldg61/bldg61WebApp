const { expect } = require('chai');

require('../helpers/testSetup');

const toolsController = require('../../controllers/tools');

const Category = require('../../models/category');
const Tool = require('../../models/tool');

describe('Tool Controller', async () => {
  it('creates categorizations with undefined, string, or array of categories', async () => {
    const category1 = await Category.create({ name: 'sewing' });
    const category2 = await Category.create({ name: 'electronics' });

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
        categoryIds: `${category1.id}`,
      },
    };
    const req2 = {
      body: {
        name: 'Adafruit GEMMA',
        totalForCheckout: '0',
        categoryIds: [`${category1.id}`, `${category2.id}`],
      },
    };

    const res = {
      redirect: route => {
        return { route };
      },
    };

    const res0 = await toolsController.create(req0, res);
    const res1 = await toolsController.create(req1, res);
    const res2 = await toolsController.create(req2, res);

    expect(res0.route).to.equal('/admin');
    expect(res1.route).to.equal('/admin');
    expect(res2.route).to.equal('/admin');

    const newTool0 = await Tool.findByName(req0.body.name);
    const newTool1 = await Tool.findByName(req1.body.name);
    const newTool2 = await Tool.findByName(req2.body.name);
    expect(newTool0.categories.length).to.equal(0);
    expect(newTool1.categories.length).to.equal(1);
    expect(newTool2.categories.length).to.equal(2);
  });
});
