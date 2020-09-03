const bcryptjs = require('bcryptjs'),
      jwt      = require('jsonwebtoken'),
      moment   = require('moment');

const database = {
    users: [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
        password: bcryptjs.hashSync('test')
    }, {
        firstName: 'Bob',
        lastName: 'Williams',
        email: 'bob@gmail.com',
        password: bcryptjs.hashSync('test')
    }, {
        firstName: 'Shannon',
        lastName: 'Jackson',
        email: 'shannon@gmail.com',
        password: bcryptjs.hashSync('test')
    }],
    posts: [{
        email: "john@gmail.com",
        title: "Sample Title"
    },{
        email: "bob@gmail.com",
        title: "Sample Title 2"
    }],
    refresh: []
};

// const interval = setInterval(() => {
//     database.refresh = database.refresh.filter(async (item, index) => {
//         const check = await jwt.verify(item, process.env.REFRESH_SECRET, (err, payload) => {
//             if (err) {
//                 return false;
//             }

//             const issuedAt = new Date(0);
//             issuedAt.setUTCSeconds(payload.iat);

//             return (new Date() - issuedAt) > process.env.REFRESH_EXPIRATION_MS;
//         });

//         return check;
//     });
// }, 60000);

module.exports = database;