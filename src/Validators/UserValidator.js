'use-strict'

const {
    check,
    validationResult
} = require('express-validator');

const validators = {
    name: check('name').trim().escape()
        .not().isEmpty()
        .withMessage("name can't be empty"),
    
    email: check('email').trim().escape()
        .not().isEmpty()
        .withMessage("email can't be empty").bail()
        .normalizeEmail().isEmail()
        .withMessage('email does not have the correct format'),
    
    password: check('password').trim().escape()
        .not().isEmpty()
        .withMessage("password can't be empty")
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
}

module.exports = {
    add: [
        validators.name,
        validators.email,
        validators.password,
        reporter
    ],
    edit: [
        validators.name.optional(),
        validators.email.optional(),
        validators.password.optional(),
        reporter
    ]
};