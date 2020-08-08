'use-strict'

const {
    check,
    validationResult
} = require('express-validator');

module.exports = [
    check('email').trim().escape()
    .not().isEmpty()
    .withMessage("email can't be empty").bail()
    .normalizeEmail().isEmail()
    .withMessage('email does not have the correct format'),

    check('password').trim().escape()
    .not().isEmpty()
    .withMessage("password can't be empty"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            
            return res.status(400).json({
                errors: errorMessages
            });
        }
        
        next();
    }
];