const express = require('express');
const server = express();

const actionModel = require('./data/helpers/actionModel.js');
// const mappers
const projectModel = require('./data/helpers/projectModel.js');

server.use(express.json());
server.get("/", (req, res) => {
  res.send('Hello World');
})

server.listen(8000, () => console.log('API running on port 8000'));
