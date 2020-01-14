const express = require('express');
const hbs = require('hbs');

const router = express.Router();

const adminController = require('../controllers/admin');

hbs.registerHelper({
  toolCategory: (categoryIdToCheck, toolCategories) => {
    return toolCategories.some(category => {
      return category.id === categoryIdToCheck;
    });
  },
  jsonStringify: object => {
    return JSON.stringify(object);
  },
});

router.get('/', adminController.index);

module.exports = router;
