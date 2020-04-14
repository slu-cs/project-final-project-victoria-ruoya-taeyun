// Model for the club collection.
const mongoose = require('mongoose');

// Define the schema
const Club = new mongoose.Schema({
  _id: String,
  category: String,
  introduction: String,
  meetingTime:String,
  meetingLocation: String,
  comingEvent: String,
  numberOfMember: String,
  officerList: [String],
  memberList: [String],
  passEvent: [String]
});

// Export the model
module.exports = mongoose.model('Club', Club);
