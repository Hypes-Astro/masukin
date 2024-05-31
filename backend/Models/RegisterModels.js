const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RegisteredSchema = new Schema({
  member_id: {
    type: Schema.Types.ObjectId,
    ref: "members",
  },
  session_id: {
    type: Schema.Types.ObjectId,
    ref: "sessions",
  },
});

// find member_id yang ada di session_id

// kalo versi kuota terlihat => session_id saat ini nge find member id yang ada di collection terdaftar

module.exports = mongoose.model("registered", RegisteredSchema);
