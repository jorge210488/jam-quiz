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

exports.getBadgeById = async (req, res) => {
  try {
    const badge = await badgeService.getBadgeById(req.params.id);
    if (!badge) {
      return res.status(404).json({ message: "Badge not found" });
    }
    res.status(200).json(badge);
  } catch (error) {
    console.error("Error fetching badge:", error);
    res.status(500).json({ message: "Error fetching badge" });
  }
};

exports.createBadge = async (req, res) => {
  try {
    const newBadge = await badgeService.createBadge(req.body);
    res.status(201).json(newBadge);
  } catch (error) {
    console.error("Error creating badge:", error);
    res.status(500).json({ message: "Error creating badge" });
  }
};

exports.updateBadge = async (req, res) => {
  try {
    const updatedBadge = await badgeService.updateBadge(
      req.params.id,
      req.body
    );
    if (!updatedBadge) {
      return res.status(404).json({ message: "Badge not found" });
    }
    res.status(200).json(updatedBadge);
  } catch (error) {
    console.error("Error updating badge:", error);
    res.status(500).json({ message: "Error updating badge" });
  }
};

exports.deleteBadge = async (req, res) => {
  try {
    const deleted = await badgeService.deleteBadge(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Badge not found" });
    }
    res.status(200).json({ message: "Badge deleted successfully" });
  } catch (error) {
    console.error("Error deleting badge:", error);
    res.status(500).json({ message: "Error deleting badge" });
  }
};
