const { Project } = require("../db");

const createProject = async (title, description, creator) => {
  try {
    const project = await Project.create(
      { title, description, creator_id: creator },
      { raw: true }
    );

    return project;
  } catch (error) {
    throw new Error(error);
  }
};

const getProjectsUser = async (creator) => {
  try {
    const projects = await Project.findAll({
      where: { creator_id: creator },
      raw: true,
    });

    return projects;
  } catch (error) {
    throw new Error(error);
  }
};

const getProjectById = async (id) => {
  try {
    const project = await Project.findOne({ where: { id }, raw: true });
    return project;
  } catch (error) {
    throw new Error(error);
  }
};

const updateProject = async (title, description, id) => {
  try {
    const updatedProject = await Project.update(
      { title, description },
      { where: { id } }
    );
    return updatedProject;
  } catch (error) {
    throw new Error(error);
  }
};

const removeProject = async (id) => {
  try {
    const removedProject = await Project.destroy({ where: { id } });
    return removedProject;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createProject,
  getProjectsUser,
  getProjectById,
  updateProject,
  removeProject,
};
