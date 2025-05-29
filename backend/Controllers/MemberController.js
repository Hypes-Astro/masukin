const { Mongoose } = require("mongoose");
const Member = require("../Models/MemberModels");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

// Get all members
const getAllMembers = async (req, res) => {
  const members = await Member.find({}).sort({ createdAt: -1 });
  res.status(200).json(members);
};

// Get a single member
const getMember = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such member" });
  }
  const member = await Member.findById(id);
  if (!member) {
    return res.status(404).json({ error: "No such member!!" });
  }
  res.status(200).json(member);
};

// Create a new member
const createMember = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Hash password dengan bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const member = await Member.create({
      username,
      email,
      password: hashedPassword, // Simpan password yang sudah dihash
    });
    res.status(200).json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a member
const deleteMember = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such member" });
  }
  const member = await Member.findByIdAndDelete({ _id: id });
  if (!member) {
    return res.status(404).json({ error: "No such member!!" });
  }
  res
    .status(200)
    .json({ message: "Member deleted successfully", data: member });
};

// Update a member
const updateMember = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such member" });
  }
  const member = await Member.findByIdAndUpdate({ _id: id }, { ...req.body });
  if (!member) {
    return res.status(404).json({ error: "No such member!!" });
  }
  res
    .status(200)
    .json({ message: "Member updated successfully", data: member });
};

const loginMember = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Cari member berdasarkan username
    const member = await Member.findOne({ username });

    // Jika member tidak ditemukan atau password salah
    if (!member || !(await bcrypt.compare(password, member.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Buat token JWT
    const token = jwt.sign(
      { memberId: member._id },
      process.env.JWT_SECRET || "your_secret_key",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token, member });
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ message: "Invalid username format" });
    } else {
      console.error("Error in loginMember:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = {
  getAllMembers,
  getMember,
  createMember,
  deleteMember,
  updateMember,
  loginMember,
};
