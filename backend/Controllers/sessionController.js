const { Mongoose } = require("mongoose");
const Session = require("../Models/SessionModels");
const mongoose = require("mongoose");

// Get all sessions
const getAllSessions = async (req, res) => {
  const sessions = await Session.find({})
    .populate("session_creator", "username")
    .sort({ createdAt: -1 });
  res.status(200).json(sessions);
};

// Get a single session
const getSession = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such session" });
  }
  const session = await Session.findById(id).populate(
    "session_creator",
    "username"
  );
  if (!session) {
    return res.status(404).json({ error: "No such session!!" });
  }
  res.status(200).json(session);
};

// Create a new session
const createSession = async (req, res) => {
  const {
    session_creator,
    session_name,
    session_quota,
    session_date,
    session_begin,
    session_end,
    session_link,
  } = req.body;
  console.log("Received data:", req.body);
  try {
    const session = await Session.create({
      session_creator,
      session_name,
      session_quota,
      session_date,
      session_begin,
      session_end,
      session_link,
    });
    res.status(200).json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a session
const deleteSession = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such session" });
  }
  const session = await Session.findByIdAndDelete({ _id: id });
  if (!session) {
    return res.status(404).json({ error: "No such session!!" });
  }
  res
    .status(200)
    .json({ message: "Session deleted successfully", data: session });
};

// Update a session
const updateSession = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such session" });
  }
  const session = await Session.findByIdAndUpdate({ _id: id }, { ...req.body });
  if (!session) {
    return res.status(404).json({ error: "No such session!!" });
  }
  res
    .status(200)
    .json({ message: "Session updated successfully", data: session });
};

module.exports = {
  getAllSessions,
  getSession,
  createSession,
  deleteSession,
  updateSession,
};
