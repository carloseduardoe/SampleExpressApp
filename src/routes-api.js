'use strict';

const router = require('express').Router();

const authController = require('./Controllers/AuthController');
const userController = require('./Controllers/UserController');

const verifyAuth = require('./Middleware/VerifyAuth');

const userValidator = require('./Validators/UserValidator');


// Route Definitions
router.post('/auth/token', authController.getToken);

router.all('/users', verifyAuth);

router   .get('/users',                    userController.browse);
router   .get('/users/:id',                userController.read);
router   .put('/users/:id', userValidator, userController.edit);
router  .post('/users',     userValidator, userController.add);
router.delete('/users/:id',                userController.delete);

module.exports = router;