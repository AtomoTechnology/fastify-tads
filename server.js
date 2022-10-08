const fastify = require('fastify')({ logger: false });

const { find, all, create, update, del } = require('./controllers/projectController');
const Task = require('./models/task');
require('./db/connection');

fastify.get('/', async (request, reply) => ({ hello: 'world' }));

fastify.get('/projects', all);
fastify.post('/projects', create);
fastify.get('/projects/:id', find);
fastify.put('/projects/:id', update);
fastify.delete('/projects/:id', del);

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

fastify.get('/location/near/:lat-:lng/radius/:r', function (request, reply) {
  const params = request.params;
  console.log(params);
  return { yes: true };
});

fastify.route({
  method: 'DELETE',
  url: '/route-long-method',
  schema: {
    querystring: {
      name: { type: 'string' },
      excitement: { type: 'integer' },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' },
        },
      },
    },
  },
  handler: function (request, reply) {
    reply.send({ hello: 'world hilaire' });
  },
});

const start = async () => {
  try {
    await fastify.listen(8000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
