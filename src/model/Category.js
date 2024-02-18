const { model, Schema } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: String,
    description: String,
    author: {
      type: Schema.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

const Category = model("Category", CategorySchema);
module.exports = Category;
