// Controller for the club collection.
const User = require('../models/user');
const Club = require('../models/club');

// Handle login requests
// POST /login (with a user ID in the request body)
module.exports.login = function(request, response, next) {
  User.findById(request.body._id)
    .then(function(user) {
      if (user) {
        request.session.user = user;
        response.status(200).end();
      } else {
        next(); // No such user
      }
    }).catch(error => next(error));
};


// Handle signup requests
// Post/users
module.exports.create = function(request, response, next) {
  User.create(request.body)
    .then(user => response.status(201).end())
    .catch(error => next(error));
};


// Handle MyAccount page requests
// Get/users
module.exports.index = function(request, response, next) {
  Club.find().then(function(clubs) {

    response.render('users/index', {clubs: clubs});

  }).catch(error => next(error));
};
