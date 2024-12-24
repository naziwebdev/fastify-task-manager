const { getUserById } = require("../services/user");
const jwt = require("jsonwebtoken");
const configs = require("../configs");

const authMiddleware = async (request, reply) => {
  try {
    let token = request.headers.authorization;

    
    if (!token) {
      return reply.status(404).send({ message: "not found token" });
    }

    token = token.split(" ")[1];

    const decodedPayload = jwt.verify(token, configs.auth.accessTokenSecretKey);
    if (!decodedPayload) {
      return reply.status(401).send({ message: "token is invalid" });
    }

    const user = await getUserById(decodedPayload.id);
    if (!user) {
      return reply.status(401).send({ message: "token is invalid" });
    }
    
    request.user = user;
  } catch (error) {
    return reply.status(401).send({ message: "token is invalid" });
  }
};

module.exports = authMiddleware;
