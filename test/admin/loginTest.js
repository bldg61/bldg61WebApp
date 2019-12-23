const { Builder, By, Key, until } = require('selenium-webdriver');
const request = require('supertest');
const { expect } = require('chai');

const app = require('../../app.js');

describe('Admin path', async () => {
  it('allows users to login', async () => {
    const res = await request(app)
      .get('/admin')
      .redirects()
      .expect(200);

    expect(res.err).to.be.undefined; // eslint-disable-line no-unused-expressions
    expect(res.text).to.include('Login');
    expect(res.text).to.include('Email');
    expect(res.text).to.include('Password');
    expect(res.text).to.include('Login');
  }).timeout(15000);;

  it('...Selenium example...', async () => {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get('http://www.google.com/ncr');
      await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
      await driver.wait(until.titleIs('webdriver - Google Search'), 3000);
    } finally {
      await driver.quit();
      expect(true).to.equal(true)
    }
  }).timeout(15000);
});
