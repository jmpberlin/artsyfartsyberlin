const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  passwordHash: {
    type: String,
    required: [true, 'PasswordHash is required!'],
  },
  email: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    required: [true, 'Email is required.'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  image: String,
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  address: {
    addressName: { type: String, default: '' },
    streetName: { type: String, default: '' },
    streetNumber: { type: Number, default: 0 },
    postalCode: { type: String, lenght: 5, default: '' },
    country: { type: String, default: '' },
    city: { type: String, default: '' },
  },
  shoppingCart: [],
});

const User = model('User', userSchema);

module.exports = User;

// shopping cart: { item: { type: Object }, quantity: Number }
