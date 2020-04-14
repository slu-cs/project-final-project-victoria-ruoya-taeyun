// Model for the user collection.
const mongoose = require('mongoose');

// Define the schema
const User = new mongoose.Schema({
  _id: String,
  my_club: [String],
  my_theme_house: String,
  club_theme_house_created_by_me: [String]
});

// Export the model
module.exports = mongoose.model('User', User);
