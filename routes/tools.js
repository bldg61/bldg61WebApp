const express = require('express');

const router = express.Router();

const toolsController = require('../controllers/tools');

router.post('/', toolsController.create);
router.post('/:id', toolsController.update);
router.post('/:id/delete', toolsController.delete);

module.exports = router;
