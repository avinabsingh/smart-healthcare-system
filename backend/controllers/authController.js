const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    console.log("Register API called"); 
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
      role: role === "admin" ? "patient" : (role || "patient"),
      // Save specialty only if the role is doctor, otherwise undefined
      specialty: role === "doctor" ? specialty : undefined
    });

    console.log("User registered successfully"); 

    res.json({ msg: "Registration successful", userId: newUser._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error during registration" });
  }
};

exports.login = async (req, res) => {
  try {
    console.log("LOGIN ATTEMPT:", req.body);

    const user = await User.findOne({ email: req.body.email });
    console.log("USER FOUND:", user);

    if (!user) {
      console.log("User not found");
      return res.status(400).send("User not found");
    }

    console.log("Entered Password:", req.body.password);
    console.log("Stored Hash:", user.password);

    const valid = await bcrypt.compare(req.body.password, user.password);
    console.log("Password Match Result:", valid);

    if (!valid) {
      console.log("Password mismatch");
      return res.status(400).send("Wrong password");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "healthcareSecret",
      { expiresIn: "1d" }
    );

    console.log("LOGIN SUCCESS");

    res.json({
      token,
      role: user.role,
      name: user.name,
      specialty: user.specialty
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
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