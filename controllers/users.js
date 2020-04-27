// Controller for the club collection.
const Users = require('../models/user');

// GET /clubs
module.exports.index = function(request, response, next) {
  Users.distinct('_id')
    .then(usersIDs => response.redirect(`/users/${usersIDs[0]}`))
    .catch(error => next(error));
};

// GET /clubs/:id
module.exports.retrieve = function(request, response, next) {
  const queries = [
    Users.findById(request.params.id),
    Users.distinct('_id')
  ];

  Promise.all(queries).then(function([user, usersIDs]) {
    if (user) {
      response.render('users/index', {user: user, userIDs: usersIDs});
    } else {
      next(); // No such club
    }
  }).catch(error => next(error));
};

// POST /club
module.exports.create = function(request, response, next) {
  User.create(request.body)
    .then(user => response.status(201).send(user.id))
    .catch(error => next(error));
};

// DELETE /club/:id
module.exports.delete = function(request, response, next) {
  User.findByIdAndDelete(request.params.id)
    .then(user => user ? response.status(200).end() : next())
    .catch(error => next(error));
};

// PUT /club/:id
module.exports.update = function(request, response, next) {
  User.findByIdAndUpdate(request.params.id, request.body)
    .then(user => user ? response.status(200).end() : next())
    .catch(error => next(error));
};
