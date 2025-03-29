const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  products:[String],
  status: {type: String, default: 'Pending'},
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;