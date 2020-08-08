const bcryptjs = require('bcryptjs'),
      uuid     = require('uuid').v4;

module.exports = {
    users: [{
        id: uuid(),
        name: 'John Doe',
        email: 'john@gmail.com',
        password: bcryptjs.hashSync('test')
    }, {
        id: uuid(),
        name: 'Bob Williams',
        email: 'bob@gmail.com',
        password: bcryptjs.hashSync('test')
    }, {
        id: uuid(),
        name: 'Shannon Jackson',
        email: 'shannon@gmail.com',
        password: bcryptjs.hashSync('test')
    }]
};