const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");


// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, clinic_id } = req.body;


    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({
      name,
      email,
      role,
      clinic_id,
      password_hash: hashedPassword
    });


    // Remove password_hash before sending response
    const { password_hash, ...userData } = user.dataValues;


    res.status(201).json({
      message: "User registered successfully",
      user: userData
    });


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ where: { email } });


    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }


    const validPassword = await bcrypt.compare(password, user.password_hash);


    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }


    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );


    // Remove password_hash before sending response
    const { password_hash, ...userData } = user.dataValues;


    res.json({
      message: "Login successful",
      token,
      user: userData
    });


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
