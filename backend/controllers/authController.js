const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashed,
    role: req.body.role || "patient"
  });

  res.json({ msg: "Registered" });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not found");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).send("Wrong password");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "healthcareSecret"
  );

  res.json({
    token,
    role: user.role
  });
};

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
};