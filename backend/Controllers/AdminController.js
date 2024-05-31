const mongoose = require("mongoose");
const { Mongoose } = require("mongoose");
const Admin = require("../Models/AdminModels");

// Add data Admin
const createAdmin = async (req, res) => {
  const { username, password } = req.body;
  // add database
  try {
    const student = await Admin.create({ username, password });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createAdmin };
