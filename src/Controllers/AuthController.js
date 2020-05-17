'use-strict'

const auth       = require('basic-auth'),
      bcryptjs   = require('bcryptjs'),
      bodyParser = require('body-parser'),
      database   = require('../TempDatabase');

const token = (req, res) => {
    console.log("/token ->", req.body);

    res.status(200).json({
        yo: "happy token here"
    });
}

module.exports = {
    getToken: token
};