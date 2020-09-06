'use-strict'

const database = require('../TempDatabase'),
      bcrypt   = require('bcryptjs'),
      User     = require('../Models/UserModel');


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
    const { first_name, last_name, email, password } = req.body;
    const salt = bcrypt.genSaltSync(password.length);
    const hash = bcrypt.hashSync(password, salt);

    User.findOne({
        email: req.body.email
    })
    .then(item => {
        if (item) {
            return res.status(400).json({ message: 'The email is already in use' });
        }

        const user = new User({ first_name, last_name, email, hash });
        user.save();

        database.users.push({ first_name, last_name, email, password: hash });

        res.status(201).json({ message: 'User created successfully' });
    })
    .catch(error => {
        res.status(500).json(error);
    });
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

