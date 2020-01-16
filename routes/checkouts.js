const express = require('express');

const router = express.Router();

const checkoutsController = require('../controllers/checkouts');

router.post('/', checkoutsController.create);

module.exports = router;
