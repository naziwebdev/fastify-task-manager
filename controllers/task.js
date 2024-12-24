const {
  createTask,
  getProjectTasks,
  getOneTask,
  isCreatorOfProject,
  editTask,
  editTaskStatus,
  removeTask,
  isOwnTask,
} = require("../services/task");

const {
  createTaskValidator,
  updateTaskValidator,
  updateTaskStatusValidator,
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
    const userId = request.user.id;
    const { project_id } = request.params;
    if (
      project_id === undefined ||
      project_id === null ||
      project_id === "" ||
      isNaN(project_id)
    ) {
      return reply.status(422).send({ message: "project_id is not valid" });
    }

    const isCreator = await isCreatorOfProject(project_id, userId);
    if (!isCreator) {
      return reply
        .status(403)
        .send({ message: "access to this route is dynied" });
    }

    const tasks = await getProjectTasks(project_id);

    return reply.status(200).send(tasks);
  } catch (error) {
    return reply.send(error);
  }
};
exports.getOne = async (request, reply) => {
  try {
    const userId = request.user.id;
    const { task_id } = request.params;
    if (
      task_id === undefined ||
      task_id === null ||
      task_id === "" ||
      isNaN(task_id)
    ) {
      return reply.status(422).send({ message: "task_id is not valid" });
    }
    const isOwnerTask = await isOwnTask(userId, task_id);
    if (!isOwnerTask) {
      return reply
        .status(403)
        .send({ message: "access to this route is dynied" });
    }

    const task = await getOneTask(task_id);

    return reply.status(200).send(task);
  } catch (error) {
    return reply.send(error);
  }
};
exports.update = async (request, reply) => {
  try {
    const userId = request.user.id;

    const { title, description, deadline, project_id, assignMembers, status } =
      request.body;
    const isCreator = await isCreatorOfProject(project_id, userId);
    if (!isCreator) {
      return reply
        .status(403)
        .send({ message: "access to this route is dynied" });
    }
    const { task_id } = request.params;
    if (
      task_id === undefined ||
      task_id === null ||
      task_id === "" ||
      isNaN(task_id)
    ) {
      return reply.status(422).send({ message: "task_id is not valid" });
    }

    await updateTaskValidator.validate(request.body, { abortEarly: false });

    const existTask = await getOneTask(task_id);
    if (!existTask) {
      return reply.status(404).send({ message: "not found task" });
    }

    await editTask(
      title,
      description,
      deadline,
      status,
      project_id,
      assignMembers,
      task_id
    );

    return reply.status(200).send({ message: "task updated successfully" });
  } catch (error) {
    return reply.send(error);
  }
};

exports.editStatusTask = async (request, reply) => {
  try {
    const userId = request.user.id;
    const { task_id } = request.params;
    const { status } = request.body;
    await updateTaskStatusValidator.validate(request.body, {
      abortEarly: false,
    });
    if (
      task_id === undefined ||
      task_id === null ||
      task_id === "" ||
      isNaN(task_id)
    ) {
      return reply.status(422).send({ message: "task_id is not valid" });
    }
    const isOwnerTask = await isOwnTask(userId, task_id);
    if (!isOwnerTask) {
      return reply
        .status(403)
        .send({ message: "access to this route is dynied" });
    }

    const existTask = await getOneTask(task_id);
    if (!existTask) {
      return reply.status(404).send({ message: "not found task" });
    }

    await editTaskStatus(status, task_id);

    return reply.status(200).send({ message: "status updated successfully" });
  } catch (error) {
    return reply.send(error);
  }
};
exports.remove = async (request, reply) => {
  try {
    const userId = request.user.id;
    const { task_id } = request.params;
    const existTask = await getOneTask(task_id);
    if (!existTask) {
      return reply.status(404).send({ message: "not found task" });
    }

    const isCreator = await isCreatorOfProject(existTask.project_id, userId);
    if (!isCreator) {
      return reply
        .status(403)
        .send({ message: "access to this route is dynied" });
    }

    if (
      task_id === undefined ||
      task_id === null ||
      task_id === "" ||
      isNaN(task_id)
    ) {
      return reply.status(422).send({ message: "task_id is not valid" });
    }

    await removeTask(task_id);
    reply.status(200).send({ message: "task removed successfully" });
  } catch (error) {
    return reply.send(error);
  }
};
