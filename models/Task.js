const { DataTypes } = require("sequelize");

//project_id => associates

const Task = (sequelize) => {
  return sequelize.define(
    "Task",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["pendding", "progressing", "completed"],
        defaultValue: "pendding",
        allowNull: false,
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "tasks",
      timestamps: true,
      createdAt: created_at,
      updatedAt: updated_at,
    }
  );
};

module.exports = Task;
