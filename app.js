const fastify = require("fastify")({ logger: true });
const fastifyCors = require("fastify-cors");
const { db } = require("./db");
const configs = require("./configs");

//load routes
const authRouter = require("./routes/auth");

//cors configs
fastify.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 204,
});

//routes
fastify.register(authRouter, { prefix: "/api/v1/auth" });

//error handler
fastify.setErrorHandler((error, request, reply) => {
  if (error.validation) {
    reply
      .status(400)
      .send({ error: "Validation Error", details: error.validation });
  } else {
    reply.status(500).send({ error: "Internal Server Error" });
  }
});

//server
const start = async () => {
  try {
    await db.authenticate();
    await fastify.listen({ port: configs.port });
    fastify.log.info(`Server running on port ${configs.port}`);
  } catch (error) {
    fastify.log.error(error);
    await db.close();
    process.exit(1);
  }
};

start();
