const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

require('../../helpers/testSetup');

const Category = require('../../../models/category');
const User = require('../../../models/user');

describe('Admin path', async () => {
  it('allows admins to list, create, update, delete categories', async () => {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
      const user = await User.create({
        firstName: 'Elowyn',
        lastName: 'Platzer Bartel',
        email: 'elowyn@example.com',
        password: 'password',
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

      await driver.wait(until.elementIsVisible(driver.findElement(By.id('categoryTabLink'))), 6000);
      await driver.findElement(By.id('categoryTabLink')).click();
      await driver.wait(until.elementIsVisible(driver.findElement(By.id('addCategory'))), 6000);
      await driver.findElement(By.id('addCategory')).click();
      await driver.wait(until.elementIsVisible(driver.findElement(By.id('categoryName'))), 6000);
      await driver.findElement(By.id('categoryName')).sendKeys('sewing');
      await driver.findElement(By.id('createCategory')).click();

      await driver.wait(until.elementIsVisible(driver.findElement(By.id('categoryTabLink'))), 6000);
      await driver.findElement(By.id('categoryTabLink')).click();
      await driver.wait(until.elementIsVisible(driver.findElement(By.id('categoriesAvailable'))), 6000);
      await driver.findElement(By.id('categoriesAvailable')).getText().then(text => {
        expect(text).to.contain('sewing');
      });

      const sewingCategory = await Category.findByName('sewing');
      await driver.findElement(By.id(`editCategory-${sewingCategory.id}`)).click();
      await driver.wait(until.elementIsVisible(driver.findElement(By.id(`categoryName-${sewingCategory.id}`))), 6000);
      await driver.findElement(By.id(`categoryName-${sewingCategory.id}`)).clear();
      await driver.findElement(By.id(`categoryName-${sewingCategory.id}`)).sendKeys('SEWING');
      await driver.findElement(By.id(`submitEditCategory-${sewingCategory.id}`)).click();

      await driver.wait(until.elementIsVisible(driver.findElement(By.id('categoryTabLink'))), 6000);
      await driver.findElement(By.id('categoryTabLink')).click();
      await driver.findElement(By.id('categoriesAvailable')).getText().then(text => {
        expect(text).to.contain('SEWING');
      });

      await driver.findElement(By.id(`deleteCategory-${sewingCategory.id}`)).click();
      await driver.wait(until.elementIsVisible(driver.findElement(By.id(`submitDeleteCategory-${sewingCategory.id}`))), 6000);
      await driver.findElement(By.id(`submitDeleteCategory-${sewingCategory.id}`)).click();

      await driver.wait(until.elementIsVisible(driver.findElement(By.id('categoryTabLink'))), 6000);
      await driver.findElement(By.id('categoryTabLink')).click();
      await driver.findElement(By.id('categoryTab')).getText().then(text => {
        expect(text).to.not.contain('SEWING');
      });
    } finally {
      await driver.quit();
    }
  }).timeout(50000);
});
