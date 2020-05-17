'use-strict'

const { check, validationResult } = require('express-validator');

module.exports = [
    check('name').exists({ checkNull: true, checkFalsy: true })
    .withMessage("name can't be empty"),

    check('description').exists({ checkNull: true, checkFalsy: true })
    .withMessage("description can't be empty"),

    check('email').exists({ checkNull: true, checkFalsy: true })
    .withMessage("email can't be empty").bail()
    .normalizeEmail().isEmail()
    .withMessage('email does not have the correct format'),

    check('password').exists({ checkNull: true, checkFalsy: true })
    .withMessage("password can't be empty"),
];