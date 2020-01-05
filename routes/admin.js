const express = require('express');
const hbs = require('hbs');

const router = express.Router();

const adminController = require('../controllers/admin');

hbs.registerHelper({
  myCategory: (thisCategoryId, myCategories) => {
    return myCategories.some(category => {
      return category.id === thisCategoryId
    })
  },
});

router.get('/', adminController.index);

module.exports = router;
