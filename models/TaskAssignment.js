const { DataTypes } = require("sequelize");

//_id & task_id => associates

const TaskAssignment = (sequelize) => {
  return sequelize.define(
    "TaskAssignment",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      tableName: "task_assignments",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};

module.exports = TaskAssignment;
