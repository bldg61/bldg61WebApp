const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

require('../../helpers/testSetup');

const User = require('../../../models/user');

describe('Admin path', async () => {
  it('allows users to login with good email and password', async () => {
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
      await driver.findElement(By.id('email')).sendKeys('wrongEmail@example.com');
      await driver.findElement(By.id('password')).sendKeys('password');
      await driver.findElement(By.id('login')).click();
      await driver.wait(until.elementIsVisible(driver.findElement(By.id('loginError'))), 6000);
      await driver.findElement(By.id('loginError')).getText().then(text => {
        expect(text).to.equal('Email or Password is incorrect');
      });

      await driver.wait(until.elementIsVisible(driver.findElement(By.id('email'))), 6000);
      await driver.findElement(By.id('email')).sendKeys('elowyn@example.com');
      await driver.findElement(By.id('password')).sendKeys('WRONGpassword');
      await driver.findElement(By.id('login')).click();
      await driver.wait(until.elementIsVisible(driver.findElement(By.id('loginError'))), 6000);
      await driver.findElement(By.id('loginError')).getText().then(text => {
        expect(text).to.equal('Email or Password is incorrect');
      });

      await driver.wait(until.elementIsVisible(driver.findElement(By.id('email'))), 6000);
      await driver.findElement(By.id('email')).sendKeys('elowyn@example.com');
      await driver.findElement(By.id('password')).sendKeys('password');
      await driver.findElement(By.id('login')).click();
      await driver.wait(until.urlContains('/admin'), 6000);
      await driver.wait(until.elementIsVisible(driver.findElement(By.id('adminGreeting'))), 6000);
      await driver.findElement(By.id('adminGreeting')).getText().then(text => {
        expect(text).to.equal(`Welcome, ${user.firstName} ${user.lastName}!`);
      });
    } finally {
      await driver.quit();
    }
  }).timeout(50000);
});
