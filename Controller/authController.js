import jwt from "jsonwebtoken";
import User from "../Model/User.js";

export const registerUser = async (req, res) => {
    console.log("fdg")
  try {
    const { name, email, phone, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    console.log("inn ")
    const user = await User.create({
      name,
      email,
      phone,
      password
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d"})
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllUsersForAdmin = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: [0, 1] } }).select("-password");
    res.json(users);
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
