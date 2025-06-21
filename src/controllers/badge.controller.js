const badgeService = require("../services/badge.service");

exports.getAllBadges = async (req, res) => {
  try {
    const badges = await badgeService.getAllBadges();
    res.status(200).json(badges);
  } catch (error) {
    console.error("Error fetching badges:", error);
    res.status(500).json({ message: "Error fetching badges" });
  }
};
