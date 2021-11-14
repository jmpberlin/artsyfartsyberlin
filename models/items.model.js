const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const itemSchema = new Schema({
  name: { type: String, required: true },
  articleNumber: { type: String },
  description: { type: String },
  price: Number,
  width: Number,
  height: Number,
  imgUrl: String,
  timestamp: { type: Date, default: Date.now },
  stock: Number,
});

const Item = model('Item', itemSchema);

module.exports = Item;
