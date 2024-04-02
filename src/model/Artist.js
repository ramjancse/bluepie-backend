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

const artistStatusValue = [
  "Pending Approval",
  "Published",
  "Deleted",   
  "Under Review",
  "Flagged", 
]

const artistSchema = new Schema(
  {
    author: {
      type: Schema.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: artistStatusValue,
    },
    artistType: {
      type: String,
      enum: artistTypeValues,
    },
    nameOfType: [
      {
        name: {
          type: String,
          enum: nameOfTypeValues,
        },
        status: Boolean
      },
    ],
    artistName: {
      type: String,
    },
    fullName: {
      type: String,
    },
    sex: {
      type: String,
      enum: ["male", "female", "other"],
    },
    region: {
      type: String,
    },
    artistImage: {
      type: String,
    },
    artistDescription: {
      type: String,
    },
    artistLinks: [
      {
        name: String,
        link: String,
      },
    ],
    socialMedia: [
      {
        name: String,
        link: String,
      },
    ],
  },
  {
    timestamps: true, // Add this option to enable timestamps
  }
);

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
