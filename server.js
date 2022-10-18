const fastify = require('fastify')({ logger: true });
const Project = require('./models/projects');
const Work = require('./models/workModel');
const User = require('./models/userModel');

require('./db/connection');

fastify.get('/', (request, reply) => reply.send({ hello: 'worldsss' }));

fastify.get('/projects', async (request, reply) => {
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

fastify.listen({ port: 8000 }, (err, address) => {
  if (err) throw err;
  console.log(`Server is now listening on ${address}`);
});
