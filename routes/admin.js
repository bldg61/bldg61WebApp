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
  formFormattedDate: date => {
    return date.getUTCFullYear() +
      '-' + pad(date.getUTCMonth() + 1) +
      '-' + pad(date.getUTCDate())

    function pad(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }
  },
  isSelectedTool: (toolId1, toolId2) => {
    return toolId1 === toolId2;
  },
  jsonStringify: object => {
    return JSON.stringify(object);
  },
  isToolCategory: (categoryIdToCheck, toolCategories) => {
    return toolCategories.some(category => {
      return category.id === categoryIdToCheck;
    });
  },
});

router.get('/', adminController.index);

module.exports = router;
