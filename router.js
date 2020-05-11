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

//
router.get('/signup',function(request, response) {
  response.render('signup');
});

// Handle login requests/
router.post('/login', users.login);

// Handle sign up requests /
router.post('/users',users.create);

// Handle logout requests
router.get('/logout', function(request, response) {
  request.session.user = undefined;
  response.redirect('/');
});
/*
// Check for admin status
const authorize = function(request, response, next) {
  if (request.session.admin) {
    console.log("sile")
    next(); // Fulfill the request
  } else {
    response.status(401).end();
  }
};
*/
// Handle club requests

router.get('/clubs', clubs.index);
router.get('/clubs/new', clubs.new);
router.get('/clubs/:id', clubs.retrieve);
// router.get('/clubs/:category',clubs.retreve);

// Create a new Club
router.post('/clubs', clubs.create);

// Update Club information
router.put('/clubs/:id', clubs.newMember);

// Delete a Club
router.delete('/clubs/:id',clubs.delete);

router.put('/clubs',clubs.retrieve);

// Handle user requests
router.get('/users/new', users.new);
router.get('/users', users.index);
// router.post('/users', users.index);


// Export the router
module.exports = router;
