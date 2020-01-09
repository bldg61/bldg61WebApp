const express = require('express');
const hbs = require('hbs');

const router = express.Router();

const adminController = require('../controllers/admin');

hbs.registerHelper({
  equipmentCategory: (categoryIdToCheck, equipmentCategories) => {
    return equipmentCategories.some(category => {
      return category.id === categoryIdToCheck;
    });
  },
  jsonStringify: object => {
    return JSON.stringify(object);
  },
});

router.get('/', adminController.index);

module.exports = router;
