'use strict';

const express = require('express');
const pg = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const app = express();
const DATABASE_URL = process.env.DATABASE_URL;
// const DATABASE_URL = 'postgres://localhost:5432/books_app';
const client = new pg.Client(DATABASE_URL);
client.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/', (request, response) => {
  response.send(`Currently under construction :-)`);
});

app.get('/test', (request, response) => {
  response.send(`Route successful`);
});

// request info for all books
app.get('/api/v1/books', (request, response) => {
  client.query(`
    SELECT book_id, author, title, isbn, image_url, description FROM books;`
  )
    .then(result => response.send(result.rows))
    .catch(console.error);
});

// make request for a single book
app.get('/api/v1/books/:id', (request, response) => {
  client.query(`
    SELECT * FROM books
    WHERE book_id=${request.params.id};`
  )
    .then(result => response.send(result.rows[0]))
    .catch(err => console.error(err));
});

// create a new book record
app.post('/api/v1/books/create', (request, response) => {
  client.query(`
    INSERT INTO books(author, title, isbn, image_url, description)
    VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING;`,
    [
      request.body.author,
      request.body.title,
      request.body.isbn,
      request.body.image_url,
      request.body.description
    ])
    .then(result => {
      console.log(result.rows[0]);
      response.send('New book created!');
    })
    .catch(err => console.error(err));
});

app.put('/api/v1/books/:id', (request, response) => {
  client.query(`
    UPDATE books
    SET author=$1, title=$2, isbn=$3, image_url=$4, description=$5
    WHERE book_id=${request.params.id}
  `,
  [
    request.body.author,
    request.body.title,
    request.body.isbn,
    request.body.image_url,
    request.body.description
  ])
    .then(() => response.status(200).send('Record updated!'))
    .catch(err => console.error(err));
});

app.delete('/api/v1/books/:id', (request, response) => {
  client.query(`
    DELETE FROM books WHERE book_id=${request.params.id};
  `)
    .then(() => response.status(204).send('Record deleted!'))
    .catch(err => console.error(err));
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
