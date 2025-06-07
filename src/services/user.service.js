const User = require("../models/User");

exports.getAllUsers = async () => {
  const users = await User.find({}, "name email role createdAt updatedAt");
  return users;
};

exports.getUserById = async (userId) => {
  const user = await User.findById(
    userId,
    "name email role createdAt updatedAt"
  );
  if (!user) throw new Error("User not found");
  return user;
};

exports.updateUser = async (userId, { name, email, role, password }) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (name) user.name = name;
  if (email) user.email = email;
  if (role) user.role = role;

  if (password) {
    user.password = password; // tu pre-save hook encripta
  }

  await user.save();

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

exports.deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new Error("User not found");
  return;
};
