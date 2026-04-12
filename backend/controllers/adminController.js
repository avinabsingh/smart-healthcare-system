const User = require("../models/User");

// Get total counts
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPatients = await User.countDocuments({ role: "patient" });
    const totalDoctors = await User.countDocuments({ role: "doctor" });

    res.json({
      totalUsers,
      totalPatients,
      totalDoctors
    });

  } catch (error) {
    console.error("Admin Stats Error:", error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};


exports.getUsersByRole = async (req, res) => {
  try {
    const role = req.params.role;

    const users = await User.find({ role }).select("name email");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};