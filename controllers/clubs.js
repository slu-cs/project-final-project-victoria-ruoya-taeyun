// Controller for the club collection.
const Club = require('../models/club');


// Handle club-page request
// Get/clubs
module.exports.index = function(request, response, next) {
  Club.distinct('_id')
    .then(clubIDs => response.redirect(`/clubs/${clubIDs[0]}`))
    .catch(error => next(error));
};
// Get/clubs/:id
module.exports.retrieve = function(request, response, next) {
  const queries = [
    Club.findById(request.params.id),
    Club.distinct('_id')
  ];

  Promise.all(queries).then(function([club, clubIDs]) {
    if (club) {
      response.render('clubs/index', {club: club, clubIDs: clubIDs});
    } else {
      next(); // No such club
    }
  }).catch(error => next(error));
};


// Create a new Club
// Get/club/new
module.exports.new = function(request, response, next) {
  Club.distinct('_id')
    .then(clubIDs => response.render('clubs/index', {club: {}, clubIDs: clubIDs}))

    .catch(error => next(error));
}
// Post/clubs
module.exports.create = function(request, response, next) {
  Club.create(request.body)
    .then(club => response.status(201).send(club.id))
    .catch(error => next(error));
};


// Update a club
// Put/clubs/:id
module.exports.update = function(request, response, next) {
  console.log("next");
  Club.findByIdAndUpdate(request.params.id, request.body,{runValidators: true})
    .then(function(club){ if(club) {response.status(200).end();} else{next()}})
    .catch(error => next(error));
};


// Delete a Club
// Delete/clubs/:id
module.exports.delete = function(request, response, next) {
  Club.findByIdAndDelete(request.params.id)
    .then(club => club ? response.status(200).end() : next())
    .catch(error => next(error));
};






module.exports.join = function(request, response, next) {
  console.log("awsl");
    Club.findByIdAndUpdate(request.params.id, {$push: {memberList: request.session.user._id}},{runValidators: true})
  .then(function(club){ if(club) {response.status(200).end();} else{next()}})
    .catch(error => next(error));
};

module.exports.leave = function(request, response, next) {
    Club.findByIdAndUpdate(request.params.id, {$pull: {memberList: request.session.user._id}},{runValidators: true})
  .then(function(club){ if(club) {response.status(200).end();} else{next()}})
    .catch(error => next(error));
};
