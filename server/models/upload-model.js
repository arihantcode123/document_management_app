const mongoose = require('mongoose');

// Define schema for the document
const uploadDocument = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    document: {
        filename: {
            type: String,
            required: true,
        },
        contentType: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            required: true,
        },
        path: {
            type: String,
            required: true, // File path or reference to storage location
        },
        url: {
            type: String,
            // required: true, // File path or reference to storage location
        },
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});

// Create the model
const Document = mongoose.model('Document', uploadDocument);

module.exports = Document;
