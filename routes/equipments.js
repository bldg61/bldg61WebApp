const express = require('express');

const router = express.Router();

const equipmentsController = require('../controllers/equipments');

router.post('/', equipmentsController.create);
router.post('/:id', equipmentsController.update);
router.post('/:id/delete', equipmentsController.delete);

module.exports = router;
