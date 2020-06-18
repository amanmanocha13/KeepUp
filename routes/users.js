const express = require('express');
const router =  express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');

router.post('/create',usersController.create);
//passport.authenticate to authenticate user
router.post('/create-session',passport.authenticate(
    'local',   //using local strategy
    {failureRedirect: '/' }
),usersController.createSession);
router.get('/destroy-session',usersController.destroySession);
router.get('/auth/google',passport.authenticate(
    'google', //using google oauth2 strategy
    {scope:['profile','email']}
));
//auth/google/callback is the url where on successfull authenticated user is redirected to

router.get('/auth/google/callback',passport.authenticate(
    'google',
    {failureRedirect: '/'}
),usersController.createSession);

router.get('/auth/facebook',passport.authenticate(
    'facebook',  //using facebook strategy
    {scope:['public_profile','email']}
));

router.get('/auth/facebook/callback',passport.authenticate(
    'facebook',
    {failureRedirect: '/'}
),usersController.createSession);

module.exports = router;