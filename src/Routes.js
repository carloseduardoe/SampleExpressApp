'use strict';

const router = require('express').Router();

const authValidator = require('./Validators/AuthValidator'); 
const userValidator = require('./Validators/UserValidator'); 

const authController = require('./Controllers/AuthController');
const userController = require('./Controllers/UserController');

const postController = require('./Controllers/PostController');

const control = [authValidator.authorize, authController.authorize];

// Route Definitions
router.post('/login',    authValidator.authenticate, authController.authenticate);
router.post('/token',    authValidator.token,        authController.token);
router.post('/logout',   authValidator.authorize,    authController.deauthenticate);

router.get(   '/users',                         userController.browse);
router.get(   '/users/:id',                     userController.read);
router.put(   '/users/:id', userValidator.edit, userController.edit);
router.post(  '/users',     userValidator.add,  userController.add);
router.delete('/users/:id',                     userController.delete);

router.get(   '/posts',     control, postController.browse);
router.get(   '/posts/:id', control, postController.read);
router.put(   '/posts/:id', control, postController.edit);
router.post(  '/posts',     control, postController.add);
router.delete('/posts/:id', control, postController.delete);

module.exports = router;