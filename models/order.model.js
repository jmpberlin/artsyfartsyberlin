// Nutzer Referenz:undefined / ID

// Status
// Items: []

// req.session.currentOrder = objectID

// bei Login currentOrder wieder undefined

const { Schema, model } = require('mongoose');
const orderSchema = new Schema({
  cartUser: { type: Schema.Types.ObjectId, ref: 'User' },
  cartSession: String,
  paid: Boolean,
  items: [
    {
      item: { type: Schema.Types.ObjectId, ref: 'Item' },
      quantity: Number,
      _id: false,
    },
  ],
  status: String,

  // passwordHash: {
  //   type: String,
  //   required: [true, 'PasswordHash is required!'],
  // },
  // email: {
  //   type: String,
  //   match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
  //   required: [true, 'Email is required.'],
  //   unique: true,
  //   lowercase: true,
  //   trim: true,
  // },
  // image: String,
  // firstName: { type: String, default: '' },
  // lastName: { type: String, default: '' },
  // address: {
  //   addressName: { type: String, default: '' },
  //   streetName: { type: String, default: '' },
  //   streetNumber: { type: Number, default: 0 },
  //   postalCode: { type: String, lenght: 5, default: '' },
  //   country: { type: String, default: '' },
  //   city: { type: String, default: '' },
  // },
  // shoppingCart: [],
});

const Order = model('Order', orderSchema);

module.exports = Order;
