const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");

// Member routes
const {
  getAllMembers,
  getMember,
  createMember,
  deleteMember,
  updateMember,
  loginMember,
} = require("../Controllers/MemberController");

router.get("/members", auth, getAllMembers);
router.get("/members/:id", auth, getMember);
router.post("/createmember", createMember);
router.delete("/members/:id", auth, deleteMember);
router.put("/members/:id", auth, updateMember);
router.post("/login", loginMember);

// Session routes
const {
  getAllSessions,
  getSession,
  createSession,
  deleteSession,
  updateSession,
} = require("../Controllers/sessionController");

router.get("/sessions", auth, getAllSessions);
router.get("/sessions/:id", auth, getSession);
router.post("/createsessions", auth, createSession);
router.delete("/sessions/:id", auth, deleteSession);
router.put("/sessions/:id", auth, updateSession);

module.exports = router;
