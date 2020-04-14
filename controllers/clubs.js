// Controller for the club collection.
const Course = require('../models/club');

// GET /clubs
module.exports.index = function(request, response, next) {
  Course.distinct('_id')
    .then(clubIDs => response.redirect(`/clubs/${clubIDs[0]}`))
    .catch(error => next(error));
};

// Get / clubs/: category
module.exports.retrieve = function(request, response, next) {
  const queries = [
    Course.findByCatefory(request.params.category),
    Course.distinct('category')
  ];

  Promise.all(queries).then(function([club, clubCategories]) {
    if (club) {
      response.render('clubs/index', {club: club, clubCategories: clubCategories});
    } else {
      next(); // No such club
    }
  }).catch(error => next(error));
};

// GET /clubs/:id
module.exports.retrieve = function(request, response, next) {
  const queries = [
    Course.findById(request.params.id),
    Course.distinct('_id')
  ];

  Promise.all(queries).then(function([club, clubIDs]) {
    if (club) {
      response.render('clubs/index', {club: club, clubIDs: clubIDs});
    } else {
      next(); // No such club
    }
  }).catch(error => next(error));
};
