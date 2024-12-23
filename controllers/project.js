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
    const { id } = request.params;

    if (id === undefined || id === null || id === "" || isNaN(id)) {
      return reply.status(422).send({ message: "commentId is not valid" });
    }

    const project = await getProjectById(id);
    if (!project) {
      return reply.status(404).send({ message: "not found project" });
    }

    return reply.status(200).send(project);
  } catch (error) {
    return reply.send(error);
  }
};
exports.update = async (request, reply) => {
  try {
    const { id } = request.params;
    const { title, description } = request.body;

    await updateProjectValidator.validate(request.body, { abortEarly: false });

    if (id === undefined || id === null || id === "" || isNaN(id)) {
      return reply.status(422).send({ message: "commentId is not valid" });
    }

    const existProject = await getProjectById(id);

    if (!existProject) {
      return reply.status(404).send({ message: "not found project" });
    }

    await updateProject(title, description, id);

    return reply.status(200).send({ message: "project updated successfully" });
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
