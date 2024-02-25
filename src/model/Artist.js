const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define enums
const artistTypeValues = ["Single", "Multiple"];
const nameOfTypeValues = [
  "Indie",
  "Singer",
  "Artist",
  "Lyricist",
  "Composer",
  "Producer",
  "Band",
  "Group",
];

const artistSchema = new Schema(
  {
    author: {
      type: Schema.ObjectId,
      ref: "User", 
    },
    artistType: {
      type: String,
      enum: artistTypeValues,
      required: true
    },
    nameOfType: {
      type: [String],
      enum: nameOfTypeValues,
      // required: true
    },
    artistName: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      // required: true
    },
    sex: {
      type: String,
      enum: ["male", "female", "other"],
      // required: true
    },
    region: {
      type: String,
      // required: true
    },
    artistImage: {
      type: String,
      // required: true
    },
    artistDiscription: {
      type: String,
      // required: true
    },
    artistLinks: [{
      id: Number,
      name: String,
      link: String
  }],

    socialMedia: [{
        id: Number,
        name: String,
        link: String
    }],
  },
  {
    timestamps: true, // Add this option to enable timestamps
  }
);

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
