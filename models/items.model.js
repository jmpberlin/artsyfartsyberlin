const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const itemSchema = new Schema({
  articleName: { type: String, required: true },
  articleNumber: { type: number },
  description: { type: String },
});

const Item = model('Item', userSchema);

module.exports = User;
