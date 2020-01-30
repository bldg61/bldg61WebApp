const express = require('express');

const router = express.Router();

const User = require('../models/user');

router.get('/', async (req, res) => {
  const currentUser = await User.find(req.session.userId);
  res.render('signupCompiler', { currentUser });
});

module.exports = router;
