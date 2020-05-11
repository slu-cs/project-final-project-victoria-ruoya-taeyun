// Controller for the club collection.
const User = require('../models/user');
const Club = require('../models/club');

// POST /login (with a user ID in the request body)
module.exports.login = function(request, response, next) {
  User.findById(request.body.id)
    .then(function(user) {
      if (user) {
        request.session.user = user;
        response.status(200).end();
      } else {
        next(); // No such user
      }
    }).catch(error => next(error));
};
/*
module.exports.signup = function(request, response, next) {
  User.find().then(function(users) {
    response.render('./views/index', {users: users});
    /*
    .then(function(users) {
      const userList = users.map(user=>user._id);
      if (userList.indexOf(new_id)<0) {
        new User ({_id: request.body.id, club_theme_house_created_by_me: []})
      }else{
        next();
      }

    }).catch(error => next(error));
};

*/


//module.exports.signup = function(request, response, next) {
  //Course.distinct('_id')
  //  .then(userIDs => response.redirect(`/user/${userIDs[0]}`))
  //  .catch(error => next(error));
//};

// Get /signup
module.exports.signup = function(request, response, next) {
  User.create(request.body)
  .then(user => response.status(201).send(club.id))
  .catch(error => next(error));
};



// GET /clubs/:id
module.exports.index = function(request, response, next) {
  Club.find().then(function(clubs) {

    response.render('users/index', {clubs: clubs});

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
