// Model for the club collection.
const mongoose = require('mongoose');

// Define the schema
const Club = new mongoose.Schema({
  _id: {type: String, required: true, maxlength:40, trim: true},
  category: {type: String, required: true, enum: ['SLU Club', 'Theme House'], trim: true},
  introduction: {type: String, required: true, maxlength:300, trim: true},
  meetingTime:{type: String, maxlength:40, trim: true},
  meetingLocation: {type: String, maxlength:40, trim: true},
  comingEvent: {type: String, maxlength:100, trim: true},
  officerList: [{type: String, maxlength:20, trim: true}],
  memberList: [{type: String, maxlength:20, trim: true}],
  pastEvent: {type: String, maxlength:100, trim: true}
});

// Export the model
module.exports = mongoose.model('Club', Club);
