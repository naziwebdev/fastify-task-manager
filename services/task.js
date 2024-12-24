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
          model: TaskAssignment,
          as: "TaskAssignment",
          include: [
            {
              model: User,
              as: "User",
              attributes: ["id", "username", "email", "phone"],
            },
          ],
          through: { attributes: [] },
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
          model: TaskAssignment,
          as: "TaskAssignment",
          include: [
            {
              model: User,
              as: "User",
              attributes: ["id", "username", "email", "phone"],
            },
          ],
          through: { attributes: [] },
        },
      ],
    });

    return task;
  } catch (error) {
    throw new Error(error);
  }
};
const editTask = async (
  title,
  description,
  deadline,
  project_id,
  assignMembers,
  status,
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

    assignMembers.map(async (member) => {
      return await TaskAssignment.update({
        user_id: member,
      });
    });

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

module.exports = {
  createTask,
  getProjectTasks,
  getOneTask,
  isCreatorOfProject,
  editTask,
  removeTask,
};
