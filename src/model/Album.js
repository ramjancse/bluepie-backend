const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define enums
const releaseTypeValues = ["Audio", "Video"]; // ["Album", "EP", "Single", "Audio", "Video"];
const formatTypeValues = ["Single", "Album", "Compilation", "Music Video"];

const albumGenreValues = [
  "Hip Hop",
  "Country",
  "Disco",
  "Jazz",
  "Reggae",
  "Classical",
  "Pop",
  "Rock",
  "Metal",
  "Blues",
  "R&B",
  "Electronic",
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
const trackTypeValues = ["Lyrical", "Instrumental"];

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
  "Scheduled for Revision",
];

const trackGenreValues = [
  "Indie",
  "Singer",
  "Artist",
  "Lyricist",
  "Composer",
  "Producer",
  "Band",
  "Group",
];

const trackSubGenreValues = [
  "Indie",
  "Singer",
  "Artist",
  "Lyricist",
  "Composer",
  "Producer",
  "Band",
  "Group",
];

const trackSchema = new Schema({
  trackTitle: {
    type: String,
  },
  trackVersion: {
    type: String,
  },
  trackArtist: [{ name: String }],
  trackArtistAdditional: [{ name: String }],
  trackArtistFeaturing: [{ name: String }],
  trackLanguage: {
    type: String,
    // enum: languageValues,
  },
  audioLanguage: {
    type: String,
    // enum: languageValues,
  },
  isrc: String,
  duration: {
    type: String,
  },
  trackGenre: [
    {
      name: {
        type: String,
        enum: trackGenreValues
      },
      status: Boolean,
    },
  ],
  trackSubGenre: [
    {
      name: {
        type: String,
        enum: trackSubGenreValues
      },
      status: Boolean,
    },
  ],
  explicit: {
    type: String,
  },
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
  producer: [
    {
      name: String,
    },
  ],
  remixer: [
    {
      name: String,
    },
  ],

  // audioFile: {
  //   type: String,
  // },
  trackType: {
    type: String,
    enum: trackTypeValues,
  },

  // trackMood: [
  //   {
  //     name: String,
  //     status: Boolean,
  //   },
  // ],
  // mix: [
  //   {
  //     name: String,
  //     status: Boolean,
  //   },
  // ],
  // tags: [
  //   {
  //     name: String,
  //   },
  // ],
  // primaryArtist: [
  //   {
  //     name: String,
  //   },
  // ],
  // arranger: [
  //   {
  //     name: String,
  //   },
  // ],
  // featuringArtist: [
  //   {
  //     name: String,
  //   },
  // ],
  // trackLinks: [
  //   {
  //     name: String,
  //     link: String,
  //   },
  // ],
  // lyrics: {
  //   type: String,
  // },
  // rating: {
  //   type: Number,
  // },
  // contract: {
  //   type: String,
  // },
  // complianceRight: {
  //   type: Boolean,
  // },
  // videoRights: {
  //   type: Boolean,
  // },
  // audioRights: {
  //   type: Boolean,
  // },
  // promoRights: {
  //   type: Boolean,
  // },
  // catalogNumber: String,
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
      // enum: albumStatusValue,
    },
    albumStatus: {
      type: String,
      enum: albumStatusValue,
    },
    releaseVersion: {
      type: String,
    },
    releaseType: {
      type: String,
      enum: releaseTypeValues,
      // required: true,
    },
    formatType: {
      type: String,
      enum: formatTypeValues,
      // required: true,
    },
    releaseTitle: {
      type: String,
      // required: true,
    },
    releaseCover: {
      type: String,
      // required: true
    },
    releaseGenre: [
      {
        name: String,
        status: Boolean,
      },
    ],
    releaseSubGenre: [
      {
        name: String,
        status: Boolean,
      },
    ],
    platforms: [
      {
        name: String,
        status: Boolean,
      },
    ],
    metadataLanguage: {
      type: String,
      enum: languageValues,
      // required: true
    },
    releasePrimaryArtist: [
      {
        name: { type: String }, // required: true
      },
    ],
    releaseSecondaryArtist: [
      {
        name: { type: String },
      },
    ],
    originalReleaseDate: {
      type: String,
      // required: true,
    },
    digitalReleaseDate: {
      type: String,
      // required: true
    },
    recordLabel: {
      type: String,
      // required: true
    },
    pLineCompany: String,
    pLineYear: String,
    cLineCompany: String,
    cLineYear: String,
    upcean: String,
    tracks: [trackSchema],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    link: String,
    releaseLanguage: {
      type: String,
      enum: languageValues,
      // required: true
    },
    catalogNumber: String,
    releaseExplicit: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
