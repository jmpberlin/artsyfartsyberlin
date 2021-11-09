const mongoose = require('mongoose');
const Item = require('../models/items.model');

const DB_NAME = 'online-shop';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/online-shop', {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const pictures = [
  {
    name: 'Mia',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'Silver Gelatin Print on Fibre Paper - Selen toned and Archival Quality.',
    width: 50,
    height: 60,
    price: 29900,
    imgUrl:
      'https://res.cloudinary.com/ddt8euqfy/image/upload/v1636448676/article02_wrijkn.jpg',
  },
  {
    name: 'Vio',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'Silver Gelatin Print on Fibre Paper - Selen toned and Archival Quality.',
    width: 50,
    height: 60,
    price: 29900,
    imgUrl:
      'https://res.cloudinary.com/ddt8euqfy/image/upload/v1636448681/article01_nztr3q.jpg',
  },
  {
    name: 'Hamudi',
    articleNumber: Math.random() * 100000000000000000,
    description:
      'Silver Gelatin Print on Fibre Paper - Selen toned and Archival Quality.',
    width: 50,
    height: 60,
    price: 29900,
    imgUrl:
      'https://res.cloudinary.com/ddt8euqfy/image/upload/v1636448675/article03_qczpv5.jpg',
  },
];

Item.create(pictures)
  .then((resFromDb) => {
    console.log(`Created ${resFromDb.length} picture articles`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((err) =>
    console.log(`An error occurred while creating articles from the DB: ${err}`)
  );
