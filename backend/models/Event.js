const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
    enum: ['Cultural', 'Musical', 'Sports', 'Other']
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startingTime: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String
  }
});

module.exports = mongoose.model('Event', EventSchema);
