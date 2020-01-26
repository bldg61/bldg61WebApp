const express = require('express');
const hbs = require('hbs');

const router = express.Router();

const adminController = require('../controllers/admin');

hbs.registerHelper({
  formFormattedDate: date => {
    return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;

    function pad(number) {
      if (number < 10) {
        return `0${number}`;
      }
      return number;
    }
  },
  isCheckoutLate: dueDate => {
    return new Date(dueDate) - new Date() <= 0;
  },
  isSelectedTool: (toolId1, toolId2) => {
    return toolId1 === toolId2 ? 'selected' : '';
  },
  isToolCategory: (categoryIdToCheck, toolCategories) => {
    return toolCategories.some(category => {
      return category.id === categoryIdToCheck;
    });
  },
  jsonStringify: object => {
    return JSON.stringify(object);
  },
  orderCheckouts: checkouts => {
    const pendingCheckouts = checkouts
    .filter(checkout => !checkout.returned)
    .sort(byCheckoutDueDate);
    const returnedCheckouts = checkouts
    .filter(checkout => checkout.returned)
    .sort(byReturnedDate);
    return [ ...pendingCheckouts, ...returnedCheckouts];

    function byCheckoutDueDate(checkoutA, checkoutB) {
      return new Date(checkoutA.dueDate) - new Date(checkoutB.dueDate)
    }
    function byReturnedDate(checkoutA, checkoutB) {
      return new Date(checkoutA.returned) - new Date(checkoutB.returned)
    }
  }
});

router.get('/', adminController.index);

module.exports = router;
