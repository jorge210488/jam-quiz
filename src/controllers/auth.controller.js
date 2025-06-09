const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });
    const token = createToken(user);
    res.status(201).json({
      user: { name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Incorrect password");
    const token = createToken(user);
    res.status(200).json({
      user: { name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
