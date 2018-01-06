'use strict';
const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
//const __API_URL__ = http://localhost:3000
//const __API_URL__ = https://git.heroku.com/cl-aa-booklist.git

const app = express();
const conString = 'postgres://localhost:5432/books_app';
const dataBaseUrl = process.env.DATABASE_URL;

const client = new pg.Client(dataBaseUrl);
client.connect();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/test', (request, response) => {
  response.send(`Route successful`);
});

app.get('/books', (request, response) => {
  client.query(`
    SELECT * FROM books;`
  )
    .then(result => response.send(result.rows))
    .catch(console.error);
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
