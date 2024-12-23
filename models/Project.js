const { DataTypes } = require("sequelize");

const Project = (sequelize) => {
  return sequelize.define(
    "Project",
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
    },
    {
      tableName: "projects",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};

module.exports = Project;
