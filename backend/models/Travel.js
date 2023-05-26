const mongoose = require('mongoose');

const TravelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
    },
    summary: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Travel', TravelSchema);
