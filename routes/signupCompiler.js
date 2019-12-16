const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('signupCompiler');
});

module.exports = router;
