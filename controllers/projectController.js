const Project = require('../models/projects');

exports.find = async (request, reply) => {
  // console.log(request.params);
  const project = await Project.findOne({ _id: request.params.id });
  reply.send({
    ok: true,
    data: project,
  });
};

exports.all = async (request, reply) => {
  console.log(request.query);
  const projects = await Project.find(request.query).populate({
    path: 'tasks',
    strictPopulate: false,
  });
  reply.send({
    ok: true,
    data: projects,
  });
};

exports.create = async (req, reply) => {
  // console.log(req.body);
  const project = await Project.create(JSON.parse(req.body));
  reply.send({
    ok: true,
    data: project,
  });
};

exports.update = async (request, reply) => {
  console.log(request.params);
  const project = await Project.updateOne({ _id: request.params.id }, JSON.parse(request.body));
  reply.send({
    ok: true,
    message: 'Document updated successfully!',
    data: project,
  });
};

exports.del = async (request, reply) => {
  await Project.deleteOne({ _id: request.params.id });
  reply.send({
    ok: true,
    message: 'Document deleted successfully!',
  });
};
