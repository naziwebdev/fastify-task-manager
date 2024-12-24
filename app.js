const fastify = require("fastify")({ logger: true });
const { db } = require("./db");
const configs = require("./configs");
const cors = require('@fastify/cors');

//cors
fastify.register(cors, {
  origin: '*', 
  methods: ['GET', 'POST','DELETE','PATCH','PUT','OPTIONS'],
  headers: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 3600,
});



//load routes
const authRouter = require("./routes/auth");
const projectRouter = require("./routes/project");
const taskRouter = require("./routes/task");

//routes
fastify.register(authRouter, { prefix: "/api/v1/auth" });
fastify.register(projectRouter, { prefix: "/api/v1/projects" });
fastify.register(taskRouter, { prefix: "/api/v1/tasks" });

//error handler
fastify.setErrorHandler((error, request, reply) => {
  if (error.validation) {
    reply
      .status(400)
      .send({ error: "Validation Error", details: error.validation });
  } else {
    console.log(error);
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
