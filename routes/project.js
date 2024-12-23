const authMiddleware = require("../middlewares/auth");
const controllers = require("../controllers/project");

async function projectRoute(fastify, options) {
  fastify.post("/", { preHandler: authMiddleware }, controllers.create);
  fastify.get("/", { preHandler: authMiddleware }, controllers.getUserProjects);
  fastify.get(
    "/:id",
    { preHandler: authMiddleware },
    controllers.getoneProject
  );
  fastify.put("/:id", { preHandler: authMiddleware }, controllers.update);
  fastify.delete("/:id", { preHandler: authMiddleware }, controllers.remove);
}


module.exports = projectRoute