const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

require('../../helpers/testSetup');

const Category = require('../../../models/category');
const Equipment = require('../../../models/equipment');
const User = require('../../../models/user');

describe('Admin path', async () => {
  it('allows admins to see list, create, update, delete equipment', async () => {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
      const user = await User.create({
        firstName: 'Elowyn',
        lastName: 'Platzer Bartel',
        email: 'elowyn@example.com',
        password: 'password',
      });

      const category1 = await Category.create({ name: 'sewing' });
      const category2 = await Category.create({ name: 'quilting' });
      const category3 = await Category.create({ name: 'fiber arts' });
      const category4 = await Category.create({ name: 'electronics' });

      const equipment = await Equipment.create({
        name: 'Sewing Machine',
        totalForCheckout: 25,
        categoryIds: [category1.id, category2.id, category3.id],
      });

      await driver.get('http://localhost:1500/admin');
      await driver.wait(until.elementIsVisible(driver.findElement(By.id('email'))), 6000);
      await driver.findElement(By.id('email')).sendKeys('elowyn@example.com');
      await driver.findElement(By.id('password')).sendKeys('password');
      await driver.findElement(By.id('login')).click();
      await driver.wait(until.urlContains('/admin'), 6000);
      await driver.wait(until.elementIsVisible(driver.findElement(By.id('adminGreeting'))), 6000);
      await driver.findElement(By.id('adminGreeting')).getText().then(text => {
        expect(text).to.equal(`Welcome, ${user.firstName} ${user.lastName}!`);
      });
      await driver.findElement(By.id('equipmentAvailable')).getText().then(text => {
        expect(text).to.contain(equipment.name);
        expect(text).to.contain(equipment.totalForCheckout);
        expect(text).to.contain(category1.name);
        expect(text).to.contain(category2.name);
        expect(text).to.contain(category3.name);
        expect(text).to.not.contain(category4.name);
      });
      await driver.findElement(By.id('addEquipment')).click();
      await driver.wait(until.elementIsVisible(driver.findElement(By.id('name'))), 6000);
      await driver.findElement(By.id('name')).sendKeys('Soldering Iron');
      await driver.findElement(By.id('totalForCheckout')).sendKeys('1');
      await driver.findElement(By.id(`categoryIds-checkbox-${category4.id}`)).click();
      await driver.findElement(By.id('createEquipment')).click();

      await driver.findElement(By.id('equipmentAvailable')).getText().then(text => {
        expect(text).to.contain('Soldering Iron');
        expect(text).to.contain('1');
        expect(text).to.contain(category4.name);
      });

      const solderingIron = await Equipment.findByName('Soldering Iron');
      await driver.findElement(By.id(`editEquipment-${solderingIron.id}`)).click();
      await driver.wait(until.elementIsVisible(driver.findElement(By.id(`name-${solderingIron.id}`))), 6000);
      await driver.findElement(By.id(`editCategoryIdsCheckbox${solderingIron.id}-${category4.id}`)).click();
      await driver.findElement(By.id(`submitEditEquipment-${solderingIron.id}`)).click();

      await driver.findElement(By.id('equipmentAvailable')).getText().then(text => {
        expect(text).to.contain('Soldering Iron');
        expect(text).to.contain('1');
        expect(text).to.not.contain(category4.name);
      });

      await driver.findElement(By.id(`deleteEquipment-${solderingIron.id}`)).click();
      await driver.wait(until.elementIsVisible(driver.findElement(By.id(`submitDeleteEquipment-${solderingIron.id}`))), 6000);
      await driver.findElement(By.id(`submitDeleteEquipment-${solderingIron.id}`)).click();

      await driver.findElement(By.id('equipmentAvailable')).getText().then(text => {
        expect(text).to.not.contain('Soldering Iron');
        expect(text).to.not.contain('1');
      });
    } finally {
      await driver.quit();
    }
  }).timeout(50000);
});
