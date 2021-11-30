// Nutzer Referenz:undefined / ID

// Status
// Items: []

// req.session.currentOrder = objectID

// bei Login currentOrder wieder undefined

const { Schema, model } = require('mongoose');
const orderSchema = new Schema({
  cartUser: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  cartSession: String,
  paid: Boolean,
  items: [
    {
      item: { type: Schema.Types.ObjectId, ref: 'Item' },
      quantity: Number,
      _id: false, // MongoDB should not create another ID here!
    },
  ],
  status: String,
  active: { type: Boolean, default: true },
  stripe: { payment_intent: String, payment_status: String },
  archive: { type: String, default: 'false' },
});

const Order = model('Order', orderSchema);

module.exports = Order;
