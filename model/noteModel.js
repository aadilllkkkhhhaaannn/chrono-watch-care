const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: "true",
    },
    watch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Watch",
      required: "true",
    },
    note: {
      type: String,
      required: "true",
    },
    isStaff: {
      type: Boolean,
      default: false,
      required: "true",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
