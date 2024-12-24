const { Task, TaskAssignment, User, Project } = require("../db");

const createTask = async (
  title,
  description,
  deadline,
  project_id,
  assignMembers
) => {
  try {
    const newTask = await Task.create(
      {
        title,
        description,
        deadline,
        project_id,
        status: "pendding",
      },
      { raw: true }
    );

    assignMembers.map(async (member) => {
      return await TaskAssignment.create({
        task_id: newTask.id,
        user_id: member,
      });
    });
  } catch (error) {
    throw new Error(error);
  }
};
const getProjectTasks = async (project_id) => {
  try {
    const tasks = await Task.findAll({
      where: { project_id },
      include: [
        {
          model: User,
          as: "users",
          through: { model: TaskAssignment, attributes: [] },
          attributes: ["id", "username", "email", "phone"],
        },
      ],
    });

    return tasks;
  } catch (error) {
    throw new Error(error);
  }
};
const getOneTask = async (id) => {
  try {
    const task = await Task.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: "users",
          through: { model: TaskAssignment, attributes: [] },
          attributes: ["id", "username", "email", "phone"],
        },
      ],
    });

    return task;
  } catch (error) {
    throw new Error(error);
  }
};
const editTaskStatus = async (status, task_id) => {
  try {
    await Task.update(
      {
        status,
      },
      { where: { id: task_id } }
    );

    return true;
  } catch (error) {
    throw new Error(error);
  }
};
const editTask = async (
  title,
  description,
  deadline,
  status,
  project_id,
  assignMembers,
  id
) => {
  try {
    await Task.update(
      {
        title,
        description,
        deadline,
        project_id,
        status,
      },
      { where: { id } }
    );

    await TaskAssignment.destroy({ where: { task_id: id } });
    const newAssignments = assignMembers.map((member) => ({
      task_id:id,
      user_id: member,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await TaskAssignment.bulkCreate(newAssignments);

    return true;
  } catch (error) {
    throw new Error(error);
  }
};
const removeTask = async (id) => {
  try {
    const removedTask = await Task.destroy({ where: { id } });
    return removedTask;
  } catch (error) {
    throw new Error(error);
  }
};
const isCreatorOfProject = async (project_id, userId) => {
  try {
    const isCreator = await Project.findOne({
      where: { id: project_id, creator_id: userId },
      raw: true,
    });
    return isCreator;
  } catch (error) {
    throw new Error(error);
  }
};

const isOwnTask = async (userId, taskId) => {
  try {
    const isMemberOwnTask = await TaskAssignment.findOne({
      where: { user_id: userId, task_id: taskId },
      raw: true,
    });

    return isMemberOwnTask;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createTask,
  getProjectTasks,
  getOneTask,
  isCreatorOfProject,
  editTask,
  removeTask,
  isOwnTask,
  editTaskStatus,
};
