const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
  console.log(`check user email, if there is a person, compare password with digest,
    if this person is cool: redirect to admin view
    else 404 get outta here
  `);
  res.render('admin');
});

module.exports = router;
