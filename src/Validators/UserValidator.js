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
        .withMessage("password can't be empty").bail()
        .matches(/^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])).{8,32}$/)
        .withMessage('the password must contain an uppercase letter, a lowercase letter, a digit and be between 8 and 32 characters long'),
    
    passwordConf: check('password2').trim().escape()
        .not().isEmpty()
        .withMessage("password confirmation can't be empty").bail()
        .custom(async (confirmation, { req }) => { 
            const password = req.body.password;
            console.log(req.body.password,confirmation);
            
            if(password !== confirmation){ 
                throw new Error();
            } 
        }).withMessage("password confirmation must match")
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
        validators.passwordConf,
        reporter
    ],
    edit: [
        validators.name.optional(),
        validators.email.optional(),
        validators.password.optional(),
        reporter
    ]
};