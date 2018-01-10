'use strict';

const express = require('express');
const pg = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const app = express();
const conString = 'postgres://localhost:5432/books_app';
const DATABASE_URL = process.env.DATABASE_URL || conString;

const client = new pg.Client(DATABASE_URL);
client.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/', (request, response) => {
  response.send(`Currently under construction :-)`);
});

app.get('/test', (request, response) => {
  response.send(`Route successful`);
});

app.get('/api/v1/books', (request, response) => {
  client.query(`
    SELECT book_id, title, author, image_url FROM books;`
  )
    .then(result => response.send(result.rows))
    .catch(console.error);
});

// make request for a single book
app.get('/api/v1/books/:id', (request, response) => {
  client.query(`
    SELECT * FROM books
    WHERE book_id = ${request.params.id};`

  )
    .then(result => response.send(result.rows))
    .catch(console.error);
});

// add a new book
app.post('/api/v1/books');

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
