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

server.get('/projects/:id', (req, res) => {
  const { id } = req.params;
  projectModel.get(id)
    .then(response => {
      if (response.length < 1) {
        res.status(404).json({ message: "The project with specified ID does not exist." })
      } else {
        res.json(response)
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The individual project ID fo info could not be retrieved." })
    })
});

server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  // const { name, description } = req.body;
  const projBody = req.body;
  projectModel.update(id, projBody)
    .then(response => {
      if (response.length < 1) {
        res.status(404).json({ message: 'The project with specified ID does not exist. Database not updated.'})
      }
      res.status(200).json(projBody);
    })
    .catch(() => {
      res.status(500).json({ error: 'The project information could not be modified.'})
    })
});

server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  projectModel.remove(id)
    .then((response) => {
      if (response < 1) {
        res.status(404).json({ message: 'The specified project does not exist - Not updated/removed' });
      } else {
        res.status(200).json(response);
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'The project was not deleted.' });
    });
});

server.post('projects/:id', (req, res) => {
  const proj = req.body;
  projectModel.insert(proj);
  .then((response) => {
    res.status(201).json(proj);
  })
  .catch(() => {
    res.status(500).json({ error: 'There was an error saving/posting to the database.'});
  })
});

server.listen(8000, () => console.log('API running on port 8000'));
