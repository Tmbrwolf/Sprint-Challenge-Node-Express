const express = require('express');
const server = express();

const actionModel = require('./data/helpers/actionModel.js');
// const mappers
const projectModel = require('./data/helpers/projectModel.js');

server.use(express.json());
server.get("/", (req, res) => {
  res.send('Hello World');
})

server.get('/projects', (req, res) => {
  projectModel.get()
  .then(response => {
    res.json(response)
  })
  .catch(() => {
    res.status(500).json({ error: "The projects data could not be retrieved."})
  })
})

server.listen(8000, () => console.log('API running on port 8000'));
