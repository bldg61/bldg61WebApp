const {
  Builder,
  By,
  until,
} = require('selenium-webdriver');

const { expect } = require('chai');

require('../../helpers/testSetup');

const Checkout = require('../../../models/checkout');
const Tool = require('../../../models/tool');
const User = require('../../../models/user');

describe('Admin path', async () => {
  it('allows admins to list, create, update, delete checkouts', async () => {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
      const user = await User.create({
        firstName: 'Elowyn',
        lastName: 'Platzer Bartel',
        email: 'elowyn@example.com',
        password: 'password',
      });
      const tool = await Tool.create({
        name: 'Rigid Heddle Loom',
        categoryIds: [],
        totalForCheckout: 5,
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

      await driver.wait(until.elementIsVisible(driver.findElement(By.id('checkoutTabLink'))), 6000);
      await driver.findElement(By.id('checkoutTabLink')).click();
      await driver.wait(until.elementIsVisible(driver.findElement(By.id('addCheckout'))), 6000);
      await driver.findElement(By.id('addCheckout')).click();
      await driver.wait(until.elementIsVisible(driver.findElement(By.id('checkout-patronName'))), 6000);
      await driver.findElement(By.id('checkout-patronName')).sendKeys('Zack Weaver');
      await driver.findElement(By.id('checkout-patronContact')).sendKeys('zack@example.com');
      await driver.executeScript(`
        document.getElementById('checkout-toolId-0').toggleAttribute('selected');
        document.getElementById('checkout-toolId-${tool.id}').toggleAttribute('selected');
      `);
      await driver.findElement(By.id('createCheckout')).click();

      await driver.wait(until.elementIsVisible(driver.findElement(By.id('checkoutTabLink'))), 6000);
      await driver.findElement(By.id('checkoutTabLink')).click();
      await driver.wait(until.elementIsVisible(driver.findElement(By.id('checkoutsAvailable'))), 6000);
      await driver.findElement(By.id('checkoutsAvailable')).getText().then(text => {
        expect(text).to.contain('Zack Weaver');
        expect(text).to.contain('zack@example.com');
        expect(text).to.contain(tool.name);
      });

      const zacksCheckout = await Checkout.wherePatronContact('zack@example.com');
      await driver.findElement(By.id(`editCheckout-${zacksCheckout.id}`)).click();
      await driver.wait(until.elementIsVisible(driver.findElement(By.id(`checkout-patronName-${zacksCheckout.id}`))), 6000);
      await driver.findElement(By.id(`checkout-patronName-${zacksCheckout.id}`)).clear();
      await driver.findElement(By.id(`checkout-patronName-${zacksCheckout.id}`)).sendKeys('Zack Bleevins');
      await driver.findElement(By.id(`submitEditCheckout-${zacksCheckout.id}`)).click();

      await driver.wait(until.elementIsVisible(driver.findElement(By.id('checkoutTabLink'))), 6000);
      await driver.findElement(By.id('checkoutTabLink')).click();
      await driver.findElement(By.id('checkoutsAvailable')).getText().then(text => {
        expect(text).to.contain('Bleevins');
      });

      await driver.findElement(By.id(`deleteCheckout-${zacksCheckout.id}`)).click();
      await driver.wait(until.elementIsVisible(driver.findElement(By.id(`submitDeleteCheckout-${zacksCheckout.id}`))), 6000);
      await driver.findElement(By.id(`submitDeleteCheckout-${zacksCheckout.id}`)).click();

      await driver.wait(until.elementIsVisible(driver.findElement(By.id('checkoutTabLink'))), 6000);
      await driver.findElement(By.id('checkoutTabLink')).click();
      await driver.findElement(By.id('checkoutTab')).getText().then(text => {
        expect(text).to.not.contain('Bleevins');
      });
    } finally {
      await driver.quit();
    }
  }).timeout(50000);
});
