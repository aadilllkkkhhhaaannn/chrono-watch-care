const mongoose = require("mongoose");

const watchSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    watch: {
      type: String,
      enum: [
        "Patek Philippe Grandmaster Chime",
        "Jacob & Co. Billionaire Watch",
        "Breguet Grande Complication Marie-Antoinette",
        "Graff Diamonds Hallucination",
        "Rolex Paul Newman Daytona",
        "Chopard 201-Carat Watch",
      ],
      required: true,
    },
    registration: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["open", "closed", "pending"],
      default: "open",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Watch", watchSchema);
