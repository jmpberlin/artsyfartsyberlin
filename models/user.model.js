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
  role: { type: String, default: 'user' },
  verified: { type: Boolean, default: false },
  firstName: { type: String },
  lastName: { type: String },
  address: {
    addressName: { type: String, default: '' },
    streetName: { type: String, default: '' },
    streetNumber: { type: Number, default: 0 },
    postalCode: { type: String, lenght: 5, default: '' },
    country: { type: String, default: '' },
    city: { type: String, default: '' },
  },
  shoppingCart: [],
  profileUrl: String,
});

const User = model('User', userSchema);

module.exports = User;

// shopping cart: { item: { type: Object }, quantity: Number }
