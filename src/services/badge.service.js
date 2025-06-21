const Badge = require("../models/Badge");

exports.getAllBadges = async () => {
  return await Badge.find();
};
