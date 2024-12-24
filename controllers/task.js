const {
  createTask,
  getProjectTasks,
  getOneTask,
  isCreatorOfProject,
  editTask,
  removeTask,
} = require("../services/task");

const {
  createTaskValidator,
  updateTaskValidator,
} = require("../validators/task");

exports.create = async (request, reply) => {
  try {
    const userId = request.user.id;
    const { title, description, deadline, project_id, assignMembers } =
      request.body;

    const isCreator = await isCreatorOfProject(project_id, userId);
    if (!isCreator) {
      return reply
        .status(403)
        .send({ message: "access to this route is dynied" });
    }

    await createTaskValidator.validate(
      { title, description, deadline, project_id, assignMembers },
      { abortEarly: false }
    );

    await createTask(title, description, deadline, project_id, assignMembers);

    return reply.status(201).send({ message: "task created successfully" });
  } catch (error) {
    return reply.send(error);
  }
};
exports.getAll = async (request, reply) => {
  try {
  } catch (error) {
    return reply.send(error);
  }
};
exports.getOne = async (request, reply) => {
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
