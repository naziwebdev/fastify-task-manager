const { Sequelize } = require("sequelize");
const configs = require("./configs");

const db = new Sequelize({
  host: configs.db.host,
  port: configs.db.port,
  username: configs.db.user,
  password: configs.db.password,
  database: configs.db.name,
  dialect: configs.db.dialect,
  logging: console.log,
});

//* JsDoc
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const User = require("./models/User")(db);
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const Project = require("./models/Project")(db);
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const Task = require("./models/Task")(db);
/** @type {import('sequelize').ModelCtor<import('sequelize').Model<any, any>} */
const TaskAssignment = require("./models/TaskAssignment")(db);

//project & user =>1:m
User.hasMany(Project, {
  foreignKey: "creator_id",
  onDelete: "CASCADE",
});

Project.belongsTo(User, {
  foreignKey: "creator_id",
});

//project & task => 1:m
Project.hasMany(Task, {
  foreignKey: "project_id",
  onDelete: "CASCADE",
});

Task.belongsTo(Project, {
  foreignKey: "project_id",
});

//task & user => m:m
Task.belongsToMany(User, {
  through: TaskAssignment,
  foreignKey: "task_id",
  as:"users",
  onDelete: "CASCADE",
});

User.belongsToMany(Task, {
  through: TaskAssignment,
  foreignKey: "user_id",
  as:"tasks",
  onDelete: "CASCADE",
});

module.exports = { db, User, Project, Task, TaskAssignment };
