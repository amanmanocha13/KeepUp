const express = require('express');
const router =  express.Router();

const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);
router.get('/signin',homeController.signIn);
router.get('/signup',homeController.signUp);
router.get('/email-sign-up',homeController.emailSignUp);
router.get('/signin/forgot',homeController.forgotPassword);
router.post('/signin/forgot',homeController.forgotPasswordEmail);
router.get('/signin/reset',homeController.updatePasswordPage);
router.post('/signin/reset',homeController.updatePassword);
router.use('/users',require('./users'));
router.use('/lists',require('./lists'));
router.use('/categories',require('./categories'));
module.exports = router;