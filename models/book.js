
const mongoose = require('mongoose');
const { Schema } = mongoose;


const newBooks = new mongoose.Schema({
  title: {type: String, req: true},
  description:  {type: String, req: true},
  status:   {type: String, req: true}
});

const bookModel = mongoose.model('books', newBooks);
module.exports = bookModel;