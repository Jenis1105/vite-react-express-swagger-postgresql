const express = require('express');
const router = express.Router(); // create router
const testController = require('../controllers/testController'); // import todo controller

router.get('/greet',testController.test);

module.exports = router;
