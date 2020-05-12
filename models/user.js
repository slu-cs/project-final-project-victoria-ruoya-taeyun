// Model for the user collection.
const mongoose = require('mongoose');

// Define the schema
const User = new mongoose.Schema({
  _id: {type: String, required: true, maxlength:20, trim: true}
});

// Export the model
module.exports = mongoose.model('User', User);
