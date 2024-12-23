const authMiddleware = require("../middlewares/auth");
const controllers = require("../controllers/task");

async function taskRoute(fastify, options) {
  fastify.post("/", { preHandler: authMiddleware }, controllers.create);
  fastify.get("/", { preHandler: authMiddleware }, controllers.getAll);
  fastify.get("/:id", { preHandler: authMiddleware }, controllers.getOne);
  fastify.put("/:id", { preHandler: authMiddleware }, controllers.update);
  fastify.delete("/:id", { preHandler: authMiddleware }, controllers.remove);
}

module.exports = taskRoute;
