const { DataTypes } = require("sequelize");

//assignedMember => associate

const Task = (sequelize) => {
  return sequelize.define(
    "Task",
    {
      id: {
        type: DataTypes.INTEGER,
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
        validate: ["pendding", "progressing", "completed"],
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
