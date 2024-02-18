const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      maxLength: 50,
      minLength: 5,
      require: true
    },
    name: {
      type: String,
      maxLength: 50,
      minLength: 5,
      require: true
    },
    email: {
      type: String,
      unique: true
    },
    password: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'declined', 'blocked'],
      default: 'pending',
    },
  },
  { timestamps: true, id: true }
);

const User = model("User", UserSchema);
module.exports = User;
