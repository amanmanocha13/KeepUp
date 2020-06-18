const express = require('express');
const router =  express.Router();
const categoriesController = require('../controllers/categories_controller');

router.post('/create',categoriesController.create);
module.exports = router;