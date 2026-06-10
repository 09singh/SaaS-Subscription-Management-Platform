import express from "express";
import bcrypt from "bcryptjs";
import User from "../shema/model.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmpassword,
      role,
      employeeCount,
      companyName,
    } = req.body;

    if (password !== confirmpassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,

      employeeCount:
        role === "company"
          ? Number(employeeCount)
          : null,

      companyName:
        role === "employee"
          ? companyName
          : null,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error saving user",
    });
  }
});

export default router;