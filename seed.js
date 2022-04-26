'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
const bookModel = require('./models/book.js');
mongoose.connect(process.env.DB_URL);
const Book = require('./models/book.js');

async function seed() {

  await Book.create({
    title:  'Hunger Games', // String is shorthand for {type: String}
    description: 'adventure',
    status: true,
  });
  console.log('book added');

  await Book.create({
    title:  'Harry Potter', // String is shorthand for {type: String}
    description: 'adventure',
    status: true,
  });
  await Book.create({
    title:  'the Way of Kings', // String is shorthand for {type: String}
    description: 'Fantasy',
    status: true,
  });
  console.log('new book created');
  mongoose.disconnect();
}

seed();
