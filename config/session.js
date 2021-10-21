// // configs/session.config.js

// // require session
// const session = require('express-session');

// // ADDED: require mongostore
// const MongoStore = require('connect-mongo');

// // ADDED: require mongoose
// const mongoose = require('mongoose');

// module.exports = (app) => {
//   app.use(
//     session({
//       secret: process.env.SESS_SECRET || 'session secret',
//       resave: false,
//       saveUninitialized: true,
//       cookie: { maxAge: 60000 },
//       store: MongoStore.create({
//         // <== ADDED !!!
//         mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/backend',
//         // ttl => time to live
//         ttl: 60 * 60 * 24, // 60sec * 60min * 24h => 1 day
//       }),
//     })
//   );
// };

// console.log('run through all the session script');

// configs/session.config.js

// require session
const session = require('express-session');

// ADDED: require mongostore
const MongoStore = require('connect-mongo');

module.exports = (app) => {
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 6000000, httpOnly: true },
      store: MongoStore.create({
        // <== ADDED !!!
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/online-shop',
        // ttl => time to live
        ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
      }),
    })
  );
};
