'use-strict'

const {
    check,
    validationResult,
    header
} = require('express-validator');

const validators = {
    email: check('email').trim().escape()
        .not().isEmpty()
        .withMessage("email can't be empty").bail()
        .normalizeEmail().isEmail()
        .withMessage('email does not have the correct format'),

    password: check('password').trim().escape()
        .not().isEmpty()
        .withMessage("password can't be empty"),

    authorization: header('authorization').trim().escape()
        .not().isEmpty()
        .withMessage("authorization must be provided"),

    token: check('token').trim().escape()
        .not().isEmpty()
        .withMessage("token must be provided")
}

const reporter = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        
        return res.status(400).json({
            errors: errorMessages
        });
    }
    
    next();
};

module.exports = {
    authenticate: [
        validators.email,
        validators.password,
        reporter
    ],
    authorize: [
        validators.authorization,
        reporter
    ],
    token: [
        validators.token,
        reporter
    ],
    deauthenticate: [
        validators.authorization,
        validators.token,
        reporter
    ]
};