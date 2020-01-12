const express = require('express');

const router = express.Router();

const categoriesController = require('../controllers/categories');

router.post('/', categoriesController.create);
router.post('/:id', categoriesController.update);
router.post('/:id/delete', categoriesController.delete);

module.exports = router;
