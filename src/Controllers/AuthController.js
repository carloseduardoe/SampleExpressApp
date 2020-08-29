'use-strict'

const bcryptjs = require('bcryptjs'),
      jwt      = require('jsonwebtoken'),
      database = require('../TempDatabase');

const dismiss = res => {
    return res.status(403).json({
        message: "Unauthorized"
    });
}

const validate = (email, password) => {
    const user = database.users.find(item => item.email === email);

    if (!user) {
        return false;
    }

    return bcryptjs.compareSync(password, user.password);
}

const generateToken = (payload, access) => {
    return jwt.sign(
        payload, 
        access ? process.env.TOKEN_SECRET : process.env.REFRESH_SECRET, 
        access && { expiresIn: process.env.TOKEN_EXPIRATION }
    );
}

const authenticate = (req, res) => {
    const { email, password } = req.body;

    if (!validate(email, password)) {
        return dismiss(res);
    }

    const token = generateToken({ email }, true);
    const refresh = generateToken({ email });

    database.refresh.push(refresh);

    return res.status(200).json({
        token: token,
        refresh: refresh
    });
};

const authorize = (req, res, next) => {
    const token = req.headers['authorization'];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            return dismiss(res);
        }

        req.user = user;
        next();
    });
}

const token = (req, res) => {
    const refresh = req.body.token;

    if (!database.refresh.includes(refresh)) {
        return dismiss(res);
    }

    jwt.verify(refresh, process.env.REFRESH_SECRET, (err, user) => {
        if (err) {
            return dismiss(res);
        }
        
        database.refresh.splice(
            database.refresh.indexOf(refresh),
            1
        );

        const token = generateToken({ email: user.email }, true);
        const newRefresh = generateToken({ email: user.email });
    
        database.refresh.push(newRefresh);
    
        return res.status(200).json({
            token: token,
            refresh: newRefresh
        });
    });
}

const deauthenticate = (req, res) => {
    const index = database.refresh.indexOf(req.body.token);

    if (index > -1) {
        database.refresh.splice(index, 1);

        return res.status(204).json({
            message: "Goodbye"
        });
    }

    return dismiss();
}

module.exports = {
    authenticate,
    authorize,
    token,
    deauthenticate
};