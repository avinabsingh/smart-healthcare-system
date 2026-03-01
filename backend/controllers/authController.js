const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, specialty } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    // Create user object
    const newUser = await User.create({
      name,
      email,
      password: hashed,
      role: role || "patient",
      // Save specialty only if the role is doctor, otherwise undefined
      specialty: role === "doctor" ? specialty : undefined
    });

    res.json({ msg: "Registration successful", userId: newUser._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error during registration" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User not found");

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).send("Wrong password");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "healthcareSecret",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
      name: user.name,
      specialty: user.specialty // Optional: send back specialty if needed on frontend
    });
  } catch (err) {
    res.status(500).send("Login error");
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).send("Error fetching profile");
  }
};