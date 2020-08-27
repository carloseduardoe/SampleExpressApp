const bcryptjs = require('bcryptjs'),
      uuid     = require('uuid').v4;

module.exports = {
    users: [{
        name: 'John Doe',
        email: 'john@gmail.com',
        password: bcryptjs.hashSync('test')
    }, {
        name: 'Bob Williams',
        email: 'bob@gmail.com',
        password: bcryptjs.hashSync('test')
    }, {
        name: 'Shannon Jackson',
        email: 'shannon@gmail.com',
        password: bcryptjs.hashSync('test')
    }]
};