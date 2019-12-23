const { Builder, By, Key, until } = require('selenium-webdriver');
const request = require('supertest');
const { expect } = require('chai');

const app = require('../../app.js');

describe('Admin path', async () => {
  it('allows users to login', async () => {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get('http://localhost:3000/admin');
      await driver.findElement(By.id('email')).sendKeys('user@example.com');
      await driver.findElement(By.id('password')).sendKeys('password');
      await driver.findElement(By.id('login')).click();
      await driver.wait(until.elementTextContains(driver.findElement(By.className('adminGreeting')), 'RUN ITS AN ADMIN!!!! eeeeeeeeee'), 3000);
      await driver.findElement(By.className('adminGreeting')).getText().then((actual) => {
        expect(actual).to.equal('RUN ITS AN ADMIN!!!! eeeeeeeeee')
      })
    } finally {
      await driver.quit();
    }
  }).timeout(15000);
});
