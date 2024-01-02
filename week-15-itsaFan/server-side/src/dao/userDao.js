const User = require("../models/user");

const createUser = async (userData) => {
  const newUser = new User(userData);
  await newUser.save();
  return newUser;
};

const findUserByUsername = async (username) => {
  return User.findOne({ username });
};

const findAllUser = async () => {
  return User.find();
};

const findUserRole = async (role) => {
  return User.find({ role });
};

const findUserByID = async (_id) => {
  return User.findById({ _id });
};

module.exports = {
  createUser,
  findUserByUsername,
  findAllUser,
  findUserRole,
  findUserByID
};
