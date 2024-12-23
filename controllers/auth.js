const {
  createUser,
  getUserById,
  getUserByPhoneOrEmail,
} = require("../services/user");
const { registerValidator } = require("../validators/register");
const { loginValidator } = require("../validators/login");
const jwt = require("jsonwebtoken");
const configs = require("../configs");
const bcrypt = require("bcrypt");

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
    const { email, phone, password } = request.body;

    await loginValidator.validate(request.body, { abortEarly:true});

    const user = await getUserByPhoneOrEmail(phone, email);

    if (!user) {
      return reply
        .status(404)
        .send({ message: "email or phone or password is incorrect" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return reply
        .status(400)
        .send({ message: "email or phone or password is incorrect" });
    }

    const token = jwt.sign({ id: user.id }, configs.auth.accessTokenSecretKey, {
      expiresIn: +configs.auth.accessTokenExpired,
    });

    reply.header("Authorization", `Bearer ${token}`);

    return reply.status(200).send({ message: "user login successfully" });
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
