const fastify = require("fastify")({ logger: true });
const fastifyCors = require("fastify-cors");
const { db } = require("./db");
const configs = require("./configs");

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
