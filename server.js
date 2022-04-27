'use strict';
//consts

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
console.log(process.env.DB_URL);
mongoose.connect(process.env.DB_URL);

const Books = require('./models/book.js');
const req = require('express/lib/request');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});



//ROUTES***************************************
app.get('/books', getBooks);
app.post('/books', postBooks);
app.delete('/books/:id', deleteBooks);

async function getBooks(req, res, next) {
  try {
    let queryObject = {}
    let results = await Books.find(queryObject);
    res.status(200).send(results);
  } catch(err) {
    next(err);
  }
}

async function postBooks (req, res, next) {
  console.log(req.body);
  try {
    let createdBooks = await Books.create(req.body);
    res.status(200).send(createdBooks);
  } catch(err) {
    next(err);
  }
}

async function deleteBooks (req, res, next) {
  let id = req.params.id;
  console.log(id)
  try {
    await Books.findByIdAndDelete(id);
    res.status(200).send('Book Removed');
  } catch(err) {
    next(err);
  }
}
app.put('/Books/:id', async (req, res) => {
  console.log(req.body)
  const { title, description, status } = req.body;
  const updatedBooks = await Books.findByIdAndUpdate(req.params.id, { title, description, status }, { new: true, overwrite: true });
  res.send(updatedBooks);
});

app.get('*', (req, res) => {
  res.status(404).send('Not availabe');
})

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
