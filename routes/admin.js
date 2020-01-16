const express = require('express');
const hbs = require('hbs');

const router = express.Router();

const adminController = require('../controllers/admin');

hbs.registerHelper({
  dateLong: rawDate => {
    const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(rawDate));
    const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(rawDate));
    return `${day}, ${date}`;
  },
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
