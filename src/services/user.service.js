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
  if (password) user.password = password; // pre-save hook lo encripta

  await user.save();

  return {
    id: user._id.toString(), // 👈 importante para mantener consistencia con login
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

exports.deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new Error("User not found");
  return;
};
