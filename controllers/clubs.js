// Controller for the club collection.
const Club = require('../models/club');

// GET /clubs
module.exports.index = function(request, response, next) {
  Club.distinct('_id')
    .then(clubIDs => response.redirect(`/clubs/${clubIDs[0]}`))
    .catch(error => next(error));
};

// GET /clubs/:id
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
