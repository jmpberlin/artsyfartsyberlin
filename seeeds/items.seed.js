const mongoose = require('mongoose');
const Item = require('../models/items.model');

const DB_NAME = 'online-shop';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/online-shop', {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const items = [
  {
    name: 'House',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'en an unknown printer took a galley of type and scrambled it to make a typerema',
  },
  {
    name: 'Dog',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'en an unknown printer took a galley of type and scrambled it to make a typerema',
  },
  {
    name: 'Phone',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'en an unknown printer took a galley of type and scrambled it to make a typerema',
  },
  {
    name: 'Burger',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'en an unknown printer took a galley of type and scrambled it to make a typerema',
  },
  {
    name: 'Greencolor',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'en an unknown printer took a galley of type and scrambled it to make a typerema',
  },
  {
    name: 'Fun',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'en an unknown printer took a galley of type and scrambled it to make a typerema',
  },
  {
    name: 'Cat',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'en an unknown printer took a galley of type and scrambled it to make a typerema',
  },
  {
    name: 'Trip',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'en an unknown printer took a galley of type and scrambled it to make a typerema',
  },
  {
    name: 'Beer',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'en an unknown printer took a galley of type and scrambled it to make a typerema',
  },
  {
    name: 'House',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'en an unknown printer took a galley of type and scrambled it to make a typerema',
  },
];

Item.create(items)
  .then((resFromDb) => {
    console.log(`Created ${resFromDb.length} items`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((err) =>
    console.log(`An error occurred while creating books from the DB: ${err}`)
  );
