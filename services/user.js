const { User } = require("../db");
const { Op } = require("sequelize");

const createUser = async (username, phone, email, password) => {
  try {
    const isFirstUser = await User.count();

    const user = await User.create(
      {
        username,
        phone,
        email,
        password,
        role: isFirstUser > 0 ? "user" : "admin",
      },
      { raw: true }
    );
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
      raw: true,
    });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserByPhoneOrEmail = async (phone, email) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [email ? { email } : null, phone ? { phone } : null],
    },
    raw: true,
  });

  return user;
};

module.exports = { createUser, getUserById, getUserByPhoneOrEmail };
