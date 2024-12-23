"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn("tasks","project_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "projects",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("projects", "creator_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("task_assignments", "task_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "tasks",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await queryInterface.addColumn("task_assignments", "user_id", {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeColumn("tasks", "project_id");
      await queryInterface.removeColumn("projects", "creator_id");
      await queryInterface.removeColumn("task_assignments", "task_id");
      await queryInterface.removeColumn("task_assignments", "user_id");

      await transaction.commit();
    } catch (error) {
      throw error;
    }

    await queryInterface.dropTable("relations");
  },
};
