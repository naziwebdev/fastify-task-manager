const controllers = require("../controllers/auth");
const authMiddleware = require('../middlewares/auth')

async function authRoute(fastify, options) {
  fastify.post("/register", controllers.register);
  fastify.post("/login", controllers.login);
  fastify.get("/me",{preHandler:authMiddleware} ,controllers.me);
}

module.exports = authRoute;
