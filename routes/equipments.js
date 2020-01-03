const express = require('express');

const router = express.Router();

const equipmentsController = require('../controllers/equipments');

router.post('/', equipmentsController.create);

module.exports = router;
