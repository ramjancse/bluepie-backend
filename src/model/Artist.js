const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define enums
const artistTypeValues = ['Single', 'Multiple'];
const nameOfTypeValues = ['indie', 'artist', 'lyricist', 'composer', 'producer', 'band', 'Group'];

const artistSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    author:{
        type: Schema.ObjectId,
        ref: 'User'  // Make sure you have a 'User' model defined
    },
    artistType: {
        type: String,
        enum: artistTypeValues,
        required: true
    },
    nameOfType: {
        type: [String],
        enum: nameOfTypeValues,
        required: true
    },
    artistName: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    region: {
        type: String,
        required: true
    },
    artistImage: {
        type: String,
        required: true
    },
    artistLinks: {
        qqMusic: String,
        netEaseMusic: String,
        spotify: String,
        AppleMusic: String,
        soundCloud: String,
        beatport: String,
        deezer: String
    },
    socialMedia: {
        instagram: String,
        facebook: String,
        twitter: String,
        weibo: String,
        douyin: String,
        tikTok: String
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    }
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;