const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistoryCreateSchema = new Schema(
  {
    creator_id: {
      type: Schema.Types.ObjectId,
      ref: "members",
    },
    session_id: {
      type: Schema.Types.ObjectId,
      ref: "sessions",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("historycreate", HistoryCreateSchema);
