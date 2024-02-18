const { model, Schema } = require("mongoose");

const NoteSchema = new Schema(
  {
    title: String,
    description: String,
    status: {
      type: String,
      enum: ['completed', 'not_completed'],
      default: 'not_completed',
    },
    author:{
        type: Schema.ObjectId,
        ref: 'User'
    },
    category:{
        type: Schema.ObjectId,
        ref: 'Category'
    }
  },
  { timestamps: true }
);

const Note = model("Note", NoteSchema);
module.exports = Note;
