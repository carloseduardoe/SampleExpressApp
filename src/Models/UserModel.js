'use-strict'

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);