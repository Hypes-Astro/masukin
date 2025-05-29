const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  session_creator: {
    type: Schema.Types.ObjectId,
    ref: "members",
    required: true,
  },
  session_name: {
    type: String,
    required: true,
  },
  session_quota: {
    type: Number,
  },
  session_date: {
    type: Date,
    required: true,
  },
  session_begin: {
    type: String,
    required: true,
  },
  session_end: {
    type: String,
    required: true,
  },
  session_link: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("sessions", SessionSchema);
