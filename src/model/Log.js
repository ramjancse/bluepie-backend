// Import mongoose
const mongoose = require('mongoose');

// Define the schema for the log entry
const logSchema = new mongoose.Schema({
    email: {
        type: String,
        // required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        // required: true
    },
    activityType: {
        type: String,
        // required: true
    },
    ipAddress: {
        type: String,
        // required: true
    },
    useragent: {
        type: String,
        // required: true
    },
    
    actionDetails: {
        type: String,
        // required: true
    },
    success: {
        type: Boolean,
        // required: true
    },
    referer: {
        type: String
    },
});

// Create a model for the log entry using the schema
const Log = mongoose.model('Log', logSchema);

module.exports = Log;