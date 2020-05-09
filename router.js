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

// Handle login requests
router.post('/login', users.login);

// Handle sign up requests
router.post('/signup',users.signup);

// Handle logout requests
router.get('/logout', function(request, response) {
  request.session.user = undefined;
  response.redirect('/index');
});

// Check for admin status
const authorize = function(request, response, next) {
  if (request.session.admin) {
    next(); // Fulfill the request
  } else {
    response.status(401).end();
  }
};

// Handle club requests

router.get('/clubs', clubs.index);
router.get('/clubs/:id', clubs.retrieve);
// router.get('/clubs/:category',clubs.retreve);
router.post('/clubs', authorize, clubs.create);
router.delete('/clubs/:id', authorize, clubs.delete);
router.put('/clubs/:id', authorize, clubs.update);

// Handle user requests
router.get('/users', users.index);
// router.post('/users', users.index);
router.post('/users', authorize, users.create);


// Export the router
module.exports = router;
