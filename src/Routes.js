'use strict';

const router = require('express').Router();

const authenticate = require('./Middleware/Authenticate');
const authorize    = require('./Middleware/Authorize');

const authValidator = require('./Validators/AuthValidator'); 
const userValidator = require('./Validators/UserValidator'); 

const authController = require('./Controllers/AuthController');
const userController = require('./Controllers/UserController');

// Route Definitions
router.post('/token',    authValidator, authController.generateToken);

router.get(   '/users',                         userController.browse);
router.get(   '/users/:id',                     userController.read);
router.put(   '/users/:id', userValidator.edit, userController.edit);
router.post(  '/users',     userValidator.add,  userController.add);
router.delete('/users/:id',                     userController.delete);

module.exports = router;