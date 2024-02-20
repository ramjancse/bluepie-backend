const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define enums
const albumTypeValues = ['Album', 'EP'];
const albumGenreValues = ['Pop', 'Rock', 'Hip Hop', 'R&B', 'Country', 'Electronic', 'Jazz', 'Classical', 'Other'];
const languageValues = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Other'];

const trackSchema = new Schema({
    trackId: {
        type: Number,
        required: true
    },
    audioFile: {
        type: String,
        required: true
    },
    metadataLanguage: {
        type: String,
        enum: languageValues,
        required: true
    },
    titleOfTrack: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    },
    trackGenre: {
        type: String,
        enum: albumGenreValues,
        required: true
    },
    audioLanguage: {
        type: String,
        enum: languageValues,
        required: true
    },
    primaryArtist: String,
    composer: String,
    lyricist: String,
    arranger: String,
    featuringArtist: String,
    producer: String,
    catalogNumber: String,
    isrc: String
});

const albumSchema = new Schema({
    albumId: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        required: true
    },
    artistId: {
        type: Number,
        required: true
    },
    albumType: {
        type: String,
        enum: albumTypeValues,
        required: true
    },
    albumName: {
        type: String,
        required: true
    },
    albumCover: {
        type: String,
        required: true
    },
    albumGenre: {
        type: String,
        enum: albumGenreValues,
        required: true
    },
    metadataLanguage: {
        type: String,
        enum: languageValues,
        required: true
    },
    primaryArtist: {
        type: String,
        required: true
    },
    featuringArtist: String,
    originalReleaseDate: {
        type: String,
        required: true
    },
    recordLabel: {
        type: String,
        required: true
    },
    plineYear: String,
    pline: String,
    clineYear: String,
    cline: String,
    upcean: String,
    tracks: [trackSchema],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User' // Make sure you have a 'User' model defined
    },
    link: String,
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;