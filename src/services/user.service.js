const User = require("../models/User");
const Badge = require("../models/Badge");

exports.getAllUsers = async () => {
  const users = await User.find({}, "name email role createdAt updatedAt");
  return users;
};

exports.getUserById = async (userId) => {
  const user = await User.findById(userId)
    .select("name email role createdAt updatedAt badges")
    .populate("badges"); // 👈 Esto trae los badges completos

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

exports.assignBadgeToUser = async (userId, badgeId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const badge = await Badge.findById(badgeId);
  if (!badge) throw new Error("Badge not found");

  // Evitar duplicados
  const alreadyHasBadge = user.badges.some(
    (b) => b.toString() === badgeId.toString()
  );

  if (!alreadyHasBadge) {
    user.badges.push(badgeId);
    await user.save();
  }

  // Retorna con badges populados
  return await User.findById(userId).populate("badges");
};
