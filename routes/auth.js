const controllers = require("../controllers/auth");

async function authRoute(fastify, options) {
  fastify.post("/register", controllers.register);
  fastify.post("/login", controllers.login);
  fastify.get("/me", controllers.me);
}

module.exports = authRoute;
