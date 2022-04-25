'use strict';
//consts
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const seed = require('./seed');
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
app.get('/Book', Books);


async function getBooks(req, res, next) {
  try {
    let queryObject = {}
    if (req.query.location) {
      queryObject.location = req.query.location;
    }
    let results = await Books.find(queryObject);
    res.status(200).send(results);
  } catch(err) {
    next(err);
  }
}

app.get('*', (req, res) => {
  res.status(404).send('Not availabe');
})

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

seed();
app.listen(PORT, () => console.log(`listening on ${PORT}`));
