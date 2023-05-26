const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    blogName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: [
        {
            type: String,
        },
    ],
});

module.exports = mongoose.model('Blog', blogSchema);
