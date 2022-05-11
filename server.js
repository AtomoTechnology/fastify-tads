// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
const Project = require('./models/projects');
const Task = require('./models/task');

const conectionString = 'mongodb+srv://taller_user:ydgee0e3AeMPsBl3@cluster0.9wx4x.mongodb.net/fastifyTads';

mongoose
  .connect(conectionString, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log('DB CONNECTED SUCCESSFULLY');
  });

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

//all
fastify.get('/projects', async (request, reply) => {
  console.log(request.query);

  const projects = await Project.find(request.query).populate('tasks');
  reply.send({
    ok: true,
    data: projects,
  });
});

// post
fastify.post('/projects', async (req, reply) => {
  // console.log(req.body);
  const project = await Project.create(JSON.parse(req.body));
  reply.send({
    ok: true,
    data: project,
  });
});

// find
fastify.get('/projects/:id', async (request, reply) => {
  console.log(request.params);
  const project = await Project.findOne({ _id: request.params.id });
  reply.send({
    ok: true,
    data: project,
  });
});
// update
fastify.put('/projects/:id', async (request, reply) => {
  console.log(request.params);
  const project = await Project.updateOne({ _id: request.params.id }, JSON.parse(request.body));
  reply.send({
    ok: true,
    message: 'Document updated successfully!',
    data: project,
  });
});
// DELETE
fastify.delete('/projects/:id', async (request, reply) => {
  await Project.deleteOne({ _id: request.params.id });
  reply.send({
    ok: true,
    message: 'Document deleted successfully!',
  });
});

// Tasks
// post
fastify.post('/tasks', async (req, reply) => {
  // console.log(req.body);
  const task = await Task.create(JSON.parse(req.body));
  reply.send({
    ok: true,
    data: task,
  });
});
fastify.get('/tasks', async (request, reply) => {
  const tasks = await Task.find(request.query).populate('ProjectId');
  reply.send({
    ok: true,
    data: tasks,
  });
});
fastify.get('/:projectId/tasks', async (request, reply) => {
  const tasks = await Task.find({ ProjectId: request.params.projectId });
  reply.send({
    ok: true,
    data: tasks,
  });
});
// Run the server!
const start = async () => {
  try {
    await fastify.listen(8000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
