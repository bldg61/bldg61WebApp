const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.render('signupCompiler');
});

module.exports = router;
