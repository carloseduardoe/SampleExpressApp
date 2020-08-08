'use-strict'

const bcryptjs = require('bcryptjs'),
      auth     = require('basic-auth'),
      database = require('../TempDatabase');

module.exports = (req, res, next) => {
    let message;
    // Parse the user's credentials from the Authorization header.

    console.log(req.headers);

    const credentials = auth(req);

    // If the user's credentials are available...
    if (credentials) {
        const user = database.users.find(item => item.email === credentials.name);

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