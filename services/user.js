const { User } = require("../db");
const { Op } = require("sequelize");



const createUser = async (username, phone, email, password) => {
  try {
    const user = await User.create(
      { username, phone, email, password },
      { raw: true }
    );
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findOne({ where: { id }, raw: true });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserByPhoneOrEmail = async (phone, email) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [{ email }, { phone }],
    },
  });

  return user;
};

module.exports = { createUser, getUserById , getUserByPhoneOrEmail};
