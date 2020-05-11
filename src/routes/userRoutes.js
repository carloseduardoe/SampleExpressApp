const userRouter                 = require('express').Router(),
      { check,validationResult } = require('express-validator'),
      auth                       = require('basic-auth'),
      bcryptjs                   = require('bcryptjs');


// Array used as in memory database.
const users = [];


// Validator
const userValidator = [
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


// Middleware
const authenticateUser = (req, res, next) => {
    let message;
    // Parse the user's credentials from the Authorization header.
    const credentials = auth(req);

    // If the user's credentials are available...
    if (credentials) {
        const user = users.find(item => item.email === credentials.name);

        if (user) {
            const authenticated = bcryptjs.compareSync(credentials.pass, user.password);

            if (authenticated) {
                req.currentUser = user;
            } else {
                message = `Authentication error for ${user.email}`;
            }
        } else {
            message = `User ${credentials.name} not found`;
        }
    } else {
        message = 'Access Denied';
    }

    // If user authentication failed...
    if (message) {
        console.warn(message);

        // Return a response with a 401 Unauthorized HTTP status code.
        return res.status(401).json({
            message: message
        });
    }

    next();
};


// Routes
userRouter.get('/whoami', authenticateUser, (req, res) => {
    const user = req.currentUser;

    res.status(200).json({
        name: user.name,
        email: user.email,
    });
});

// Creates a new user.
userRouter.post('/', userValidator, (req, res) => {
    // Attempt to get the validation result from the Request object.
    const errors = validationResult(req);

    // If there are validation errors...
    if (!errors.isEmpty()) {
        // Use the Array `map()` method to get a list of error messages.
        const errorMessages = errors.array().map(error => error.msg);

        // Return the validation errors to the client.
        return res.status(400).json({
            errors: errorMessages
        });
    }

    // Get the user from the request body.
    const user = req.body;

    // Hash the new user's password.
    user.password = bcryptjs.hashSync(user.password);

    // Add the user to the `users` array.
    users.push(user);

    // Set the status to 201 Created and end the response.
    res.status(201).end();
});


module.exports = userRouter;