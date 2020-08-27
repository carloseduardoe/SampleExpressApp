'use-strict'

const bcryptjs   = require('bcryptjs'),
      database   = require('../TempDatabase');

const findUser = email => {
    return database.users.find(item => item.email === email);
};

const authenticate = (email, password) => {
    const user = database.users.find(item => item.email === email);

    if (!user) {
        return false;
    }

    return bcryptjs.compareSync(password, user.password);
}

const token = (req, res) => {
    const { email, password } = req.body;

    if (!authenticate(email, password)) {
        return res.status(403).json({
            message: "Unauthorized"
        })
    }

    return res.status(200).json({
        token: bcryptjs.hashSync("abcdefg")
    });
};

module.exports = {
    generateToken: token
};