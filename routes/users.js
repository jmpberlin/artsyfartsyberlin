var express = require('express');
var router = express.Router();
const uploader = require('../config/cloudinary');
const User = require('../models/user.model');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/:id/nameUpdate', (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId).then((userFromDb) => {
    userFromDb.firstName = req.body.firstName;
    userFromDb.lastName = req.body.lastName;
    userFromDb.save();
    res.json({
      success: true,
      msg: 'everything worked!',
    });
  });
});

router.post('/:id/picUpload', uploader.single('imageUrl'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  User.findById(req.session.currentUser._id).then((userFromDb) => {
    userFromDb.profileUrl = req.file.path;
    userFromDb.save();
    res.json({ success: true, msg: 'everything worked' });
  });
});

// NO BACKEND CHECK YET; IF THE RECEIVE DATA IS VALID (POSTALCOUDE FOR EXAMPLE)
router.post('/:id/addressUpdate', (req, res, next) => {
  const userId = req.params.id;
  const { addressName, streetName, streetNumber, postalCode, city, country } =
    req.body;
  User.findById(userId).then((userFromDb) => {
    userFromDb.address.addressName = addressName;
    userFromDb.address.streetName = streetName;
    userFromDb.address.postalCode = postalCode;
    userFromDb.address.streetNumber = streetNumber;
    userFromDb.address.city = city;
    userFromDb.address.country = country;
    userFromDb.save();
    res.json({
      success: true,
      msg: 'everything worked!',
      user: userFromDb,
    });
  });
});
module.exports = router;
