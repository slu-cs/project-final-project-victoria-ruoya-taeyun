// Router for content requests.
const express = require('express');
const clubs = require('./controllers/clubs');
const users = require('./controllers/users');


// Create the router
const router = express.Router();

// Handle home-page requests
router.get('/', function(request, response) {
  response.render('index');
});

// Check for admin status
const authorize = function(request, response, next) {
  if (request.session.user) {
    next(); // Fulfill the request
  } else {
    response.render('index');
  }
};

// Handle login requests
router.post('/login', users.login);

// Handle logout requests
router.get('/logout',function(request, response) {
  request.session.user = undefined;
  response.redirect('/');
});

// Handle signup requests
router.get('/signup',function(request, response) {
  response.render('signup');
});
router.post('/users',users.create);

// Create a new Club
router.get('/clubs/new', authorize,clubs.new);
router.post('/clubs', authorize,clubs.create);

// Handle club-page request
router.get('/clubs', authorize,clubs.index);
router.get('/clubs/:id',authorize, clubs.retrieve);

// Handle MyAccount page requests
router.get('/users',authorize, users.index);

// Update a Club
router.put('/clubs/:id',authorize, clubs.update);

// redirect when user click their club on the account page
router.get('/clubs/club._id',authorize, clubs.retrieve);
// router.get('/clubs/:category',clubs.retreve);

// Delete a Club
router.delete('/clubs/:id',authorize,clubs.delete);

// Handle join requests
router.put('/clubs/join/:id',authorize,clubs.join);

// Handle leave requests
router.put('/clubs/leave/:id/',authorize,clubs.leave);

module.exports = router;
