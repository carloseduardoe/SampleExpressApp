'use-strict'

const auth       = require('basic-auth'),
      bcryptjs   = require('bcryptjs'),
      database   = require('../TempDatabase');

const findUser = email => {
    return database.users.find(item => item.email === email);
};

const token = (req, res) => {
    const params = req.body;

    res.status(200).json({
        token: bcryptjs.hashSync(params.email + params.password)
    });
};

module.exports = {
    generateToken: token
};