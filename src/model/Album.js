const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define enums
const albumTypeValues = ["Album", "EP", "Single"];
const albumGenreValues = [
  "Pop",
  "Rock",
  "Hip Hop",
  "R&B",
  "Country",
  "Electronic",
  "Jazz",
  "Classical",
  "World Music",
  "Latin",
  "Goth",
  "Folk",
  "Contemporary Folk",
  "Other",
];
const languageValues = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Other",
];
const typeOfTrackValues = [
  "Lyrical",
  "Instrumental"
];

const albumStatusValue = [
  "Draft",
  "Published",
  "Scheduled",
  "Archived",
  "Deleted",   
  "Under Review",
  "Pending Approval",
  "Flagged",   
  "Drafting",
  "Scheduled for Revision"
]

const trackSchema = new Schema({
  audioFile: {
    type: String,
  },
  metadataLanguage: {
    type: String,
    enum: languageValues,
  },
  typeOfTrack: {
    type: String,
    enum: typeOfTrackValues,
  },
  titleOfTrack: {
    type: String,
  },
  version: {
    type: String,
  },
  duration: {
    type: String,
  },
  explicit: {
    type: String,
  },
  trackGenre: [
    {
      name: String,
      status: Boolean
    },
  ],
  trackMood: [
    {
      name: String,
      status: Boolean
    },
  ],
  mix: [
    {
      name: String,
      status: Boolean
    },
  ],
  tags: [
    {
      name: String,
    },
  ],
  audioLanguage: {
    type: String,
    enum: languageValues,
  },
  primaryArtist: [
    {
      name: String,
    },
  ],
  composer: [
    {
      name: String,
    },
  ],
  lyricist: [
    {
      name: String,
    },
  ],
  arranger: [
    {
      name: String,
    },
  ],
  featuringArtist: [
    {
      name: String,
    },
  ],
  producer: [
    {
      name: String,
    },
  ],
  mixer: [
    {
      name: String,
    },
  ],
  trackLinks: [
    {
      name: String,
      link: String,
    },
  ],
  lyrics: {
    type: String,
  },
  rating: {
    type: Number,
  },
  contract: {
    type: String,
  },
  complianceRight: {
    type: Boolean,
  },
  videoRights: {
    type: Boolean,
  },
  audioRights: {
    type: Boolean,
  },
  promoRights: {
    type: Boolean,
  },
  catalogNumber: String,
  isrc: String,
});

const albumSchema = new Schema(
  {
    albumId: {
      type: String,
      // required: true
    },
    userId: {
      type: String,
      ref: "User",
      // required: true
    },
    artistId: {
      type: String,
      ref: "Artist",
      // required: true
    },
    status: {
      type: String,
      enum: albumStatusValue,
    },
    albumType: {
      type: String,
      enum: albumTypeValues,
      // required: true
    },
    albumName: {
      type: String,
      // required: true
    },
    albumCover: {
      type: String,
      // required: true
    },
    albumGenre: [
      {
        name: String,
        status: Boolean
      },
    ],
    metadataLanguage: {
      type: String,
      enum: languageValues,
      // required: true
    },
    primaryArtist: [
      {
        name: String,
      },
    ],
    featuringArtist: [
      {
        name: String,
      },
    ],
    originalReleaseDate: {
      type: String,
      // required: true
    },
    recordLabel: {
      type: String,
      // required: true
    },
    pLineYear: String,
    pLine: String,
    cLineYear: String,
    cLine: String,
    upcean: String,
    tracks: [trackSchema],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    link: String,
  },
  {
    timestamps: true,
  }
);

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
