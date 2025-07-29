const Badge = require("../models/Badge");

exports.getAllBadges = async () => {
  return await Badge.find();
};

exports.getBadgeById = async (id) => {
  return await Badge.findById(id);
};

exports.createBadge = async (data) => {
  return await Badge.create(data);
};

exports.updateBadge = async (id, data) => {
  return await Badge.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteBadge = async (id) => {
  const result = await Badge.findByIdAndDelete(id);
  return result;
};
