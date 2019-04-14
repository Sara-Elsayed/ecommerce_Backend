var mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: {
      unique: true
    },
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  isOnSale: {
    type: Boolean,
  },
  image: {
    type: String,
  },
  paymentType:{
    type:Array,
  },
  userid: {
    type: String
  },
});
const Product = mongoose.model('Product', schema);

module.exports = Product;