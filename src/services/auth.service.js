const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.registerUser = async ({ name, email, password, role }) => {
  const user = await User.create({ name, email, password, role });
  const token = createToken(user);
  return {
    user: { name: user.name, email: user.email, role: user.role },
    token,
  };
};

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Incorrect password");

  const token = createToken(user);
  return {
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
  };
};
