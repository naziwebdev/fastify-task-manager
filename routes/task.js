const authMiddleware = require("../middlewares/auth");
const controllers = require("../controllers/task");

async function taskRoute(fastify, options) {
  fastify.post("/", { preHandler: authMiddleware }, controllers.create);
  fastify.get(
    "/:project_id/tasks",
    { preHandler: authMiddleware },
    controllers.getAll
  );
  fastify.get("/:task_id", { preHandler: authMiddleware }, controllers.getOne);
  fastify.put("/:task_id", { preHandler: authMiddleware }, controllers.update);
  fastify.patch(
    "/:task_id/status",
    { preHandler: authMiddleware },
    controllers.editStatusTask
  );
  fastify.delete(
    "/:task_id",
    { preHandler: authMiddleware },
    controllers.remove
  );
}

module.exports = taskRoute;
