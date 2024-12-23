const {
  createProjectValidator,
  updateProjectValidator,
} = require("../validators/project");
const {
  createProject,
  getProjectsUser,
  getProjectById,
  updateProject,
  removeProject,
} = require("../services/project");

exports.create = async (request, reply) => {
  try {
    const creator = request.user.id;
    const { title, description } = request.body;
    await createProjectValidator.validate(request.body, { abortEarly: false });

    await createProject(title, description, creator);

    return reply.status(201).send({ message: "project created successfully" });
  } catch (error) {
    return reply.send(error);
  }
};

exports.getUserProjects = async (request, reply) => {
  try {
    const creator = request.user.id;

    const projects = await getProjectsUser(creator);
    if (!projects) {
      return reply.status(404).send({ message: "not found project" });
    }

    return reply.status(200).send(projects);
  } catch (error) {
    return reply.send(error);
  }
};

exports.getoneProject = async (request, reply) => {
  try {
  } catch (error) {
    return reply.send(error);
  }
};
exports.update = async (request, reply) => {
  try {
  } catch (error) {
    return reply.send(error);
  }
};
exports.remove = async (request, reply) => {
  try {
  } catch (error) {
    return reply.send(error);
  }
};
