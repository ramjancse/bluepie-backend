const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labelStatusValue = [
  "Pending Approval",
  "Published",
  "Deleted",
  "Flagged", 
]

const labelSchema = new Schema(
  {
    author: {
      type: Schema.ObjectId,
      ref: "User",
    },

    labelName: {
      type: String,
    },
    status: {
      type: String,
      enum: labelStatusValue,
    },
  },
  {
    timestamps: true, // Add this option to enable timestamps
  }
);

const Label = mongoose.model("Label", labelSchema);

module.exports = Label;
