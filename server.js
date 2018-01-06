'use strict';
const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
//const __API_URL__ = http://localhost:3000
//const__API_URL__ = https://git.heroku.com/cl-aa-booklist.git

const app = express();
// const conString;
// const client = new pg.Client();
// client.connect();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/test', (request, response) => {
  response.send(`Route successful`);
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
