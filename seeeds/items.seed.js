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
    name: 'Sneaker',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'en an unknown printer took a galley of type and scrambled it to make a typerema',
    price: 9500,
  },
  {
    name: 'Boots',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'en an unknown printer took a galley of type and scrambled it to make a typerema',
    price: 12000,
  },
  {
    name: 'Phone',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'en an unknown printer took a galley of type and scrambled it to make a typerema',
    price: 40000,
  },
  {
    name: 'Burger',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'en an unknown printer took a galley of type and scrambled it to make a typerema',
    price: 800,
  },
  {
    name: 'iPhone 3G',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'en an unknown printer took a galley of type and scrambled it to make a typerema',
    price: 90000,
  },
  {
    name: 'MacBook Pro 2010',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'en an unknown printer took a galley of type and scrambled it to make a typerema',
    price: 85000,
  },
  {
    name: 'Cat',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'en an unknown printer took a galley of type and scrambled it to make a typerema',
    price: 12345,
  },
  {
    name: 'Trip',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'en an unknown printer took a galley of type and scrambled it to make a typerema',
    price: 100000,
  },
  {
    name: 'Una caña',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'en an unknown printer took a galley of type and scrambled it to make a typerema',
    price: 100,
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
