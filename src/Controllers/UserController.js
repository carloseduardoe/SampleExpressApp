'use-strict'

const database = require('../TempDatabase');

// Array used as in memory database.
const users = [];


const index = (req, res) => {
    const user = req.currentUser;

    res.status(200).json({
        name: user.name,
        email: user.email,
    });
};

const show = (req, res) => {};

const edit = (req, res) => {};

const add = (req, res) => {
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
    database.users.push(user);

    // Set the status to 201 Created and end the response.
    res.status(201).end();
};

const erase = (req, res) => {};


module.exports = {
    browse: index,
    read:   show,
    edit:   edit,
    add:    add,
    delete: erase
};