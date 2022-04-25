
const mongoose = require('mongoose');

const newBooks = new mongoose.Schema({
  title:  String, // String is shorthand for {type: String}
  description: String,
  status:   String,
});

const bookModel = mongoose.model('books', newBooks);
module.exports = bookModel;