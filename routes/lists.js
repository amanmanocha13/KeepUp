const express = require('express');
const router =  express.Router();
const passport = require('passport');
const listsController = require('../controllers/lists_controller');

//passport.checkAuthentication used as middleware to check is user authenticated
router.get('/',passport.checkAuthentication,listsController.lists);
router.get('/add',passport.checkAuthentication,listsController.add);
router.post('/create',listsController.create);
router.get('/edit/:id',listsController.editList);
router.get('/update-task',listsController.updateTask);
router.get('/delete-task',listsController.deleteTask);
router.post('/update/:id',listsController.updateList);
router.get('/delete/:id',listsController.delete);
module.exports = router;