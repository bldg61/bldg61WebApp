const express = require('express');

const router = express.Router();

const loginController = require('../controllers/login');

router.get('/', loginController.new);
router.post('/', loginController.create);
router.get('/delete', loginController.destroy);

module.exports = router;
