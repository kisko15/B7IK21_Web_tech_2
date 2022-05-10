const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let Products = new Schema({
  name: {
    type: String
  },
  price: {
    type: String
  },
  description: {
    type: String
  }
}, {
  collection: 'products'
})
 
module.exports = mongoose.model('Products', Products)