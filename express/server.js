const express = require('express');
const app = express();
const Project = require('./models/projects');
const Work = require('./models/workModel');
const User = require('./models/userModel');

require('./db/connection');

app.get('/', (req, res) => res.send('Hello World'));

app.get('/projects', async (request, reply) => {
  console.log(request.query);
  const projects = await Work.find(request.query).populate({
    path: 'cliente',
    // strictPopulate: false,
  });
  console.log(`project : `, projects);
  return reply.send({
    ok: true,
    results: projects.length,
    data: projects,
  });
});

app.listen(8001);
