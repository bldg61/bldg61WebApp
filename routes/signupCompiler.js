const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.render('signups');
});

module.exports = router;
