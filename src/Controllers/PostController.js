'use-strict'

const database = require('../TempDatabase');


const index = (req, res) => {
    res.status(200).json([req.user].concat(database.posts));
};

const show = (req, res) => {
    res.status(404).end();
};

const edit = (req, res) => {
    res.status(404).end();
};

const add = (req, res) => {
    res.status(500).end();
};

const erase = (req, res) => {
    res.status(500).end();
};

module.exports = {
    browse: index,
    read:   show,
    edit:   edit,
    add:    add,
    delete: erase
};

