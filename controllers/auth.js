const {
  createUser,
  getUserById,
  getUserByPhoneOrEmail,
} = require("../services/user");
const { registerValidator } = require("../validators/register");
const { loginValidator } = require("../validators/login");
const jwt = require("jsonwebtoken");
const configs = require("../configs");

exports.register = async (request, reply) => {
  try {
    const { username, phone, email, password } = request.body;

    await registerValidator.validate(request.body, { abortEarly: false });

    const existUser = await getUserByPhoneOrEmail(phone, email);

    if (existUser) {
      return reply.status(400).send({ message: "user exist already" });
    }

    const user = await createUser(username, phone, email, password);

    const token = jwt.sign({ id: user.id }, configs.auth.accessTokenSecretKey, {
      expiresIn: +configs.auth.accessTokenExpired,
    });

    reply.header("Authorization", `Bearer ${token}`);

    return reply
      .status(201)
      .send({ message: "user created successfully", token });
  } catch (error) {
    reply.send(error);
  }
};
exports.login = async (request, reply) => {
  try {
  } catch (error) {
    reply.send(error);
  }
};
exports.me = async (request, reply) => {
  try {
  } catch (error) {
    reply.send(error);
  }
};
