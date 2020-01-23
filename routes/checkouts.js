const express = require('express');

const router = express.Router();

const checkoutsController = require('../controllers/checkouts');

router.post('/', checkoutsController.create);
router.post('/:id', checkoutsController.update);
router.post('/:id/delete', checkoutsController.delete);

module.exports = router;
