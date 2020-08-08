'use-strict'

const database = require('../TempDatabase'),
      bcrypt   = require('bcryptjs').hashSync,
      uuid     = require('uuid').v4;


const index = (req, res) => {
    res.status(200).json(database.users);
};

const show = (req, res) => {
    const user = database.users.find(item => item.id === req.params.id);

    if (user) {
        res.status(200).json(user);
        return;
    }
    
    res.status(404).end();
};

const edit = (req, res) => {
    const { name, email, password } = req.body;
    let index = database.users.findIndex(item => item.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    database.users[index] = {
        id:       database.users[index].id,
        name:     name     ? name             : database.users[index].name,
        email:    email    ? email            : database.users[index].email,
        password: password ? bcrypt(password) : database.users[index].password 
    };

    res.status(200).json(database.users[index]);
};

const add = (req, res) => {
    const user = (({ name, email, password }) => ({
        id: uuid(),
        name,
        email,
        password: bcrypt(password)
    }))(req.body);

    database.users.push(user);
    
    res.status(201).json(user);
};

const erase = (req, res) => {
    let index = database.users.findIndex(item => item.id === req.params.id);

    if (index > -1) {
        database.users.splice(index, 1);
        return res.status(200).json({ message: 'User deleted' });
    }

    res.status(404).json({ message: 'User not found' });
};

module.exports = {
    browse: index,
    read:   show,
    edit:   edit,
    add:    add,
    delete: erase
};