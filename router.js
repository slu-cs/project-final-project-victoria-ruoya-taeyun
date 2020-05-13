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

// Handle logout requests
router.get('/logout', function(request, response) {
  request.session.user = undefined;
  response.redirect('/');
});

// Handle signup requests
router.get('/signup',function(request, response) {
  response.render('signup');
});
router.post('/users',users.create);

// Create a new Club
router.get('/clubs/new', clubs.new);
router.post('/clubs', clubs.create);

// Handle club-page request
router.get('/clubs', clubs.index);
router.get('/clubs/:id', clubs.retrieve);

// Handle MyAccount page requests
router.get('/users', users.index);

// Update a Club
router.put('/clubs/:id', clubs.update);


// redirect when user click their club on the account page
router.get('/clubs/club._id', clubs.retrieve);
// router.get('/clubs/:category',clubs.retreve);

// Delete a Club
router.delete('/clubs/:id',clubs.delete);

//?


// add new member to the clubs
router.put('/clubs/:id/',clubs.newMember);



router.put('/clubs',clubs.retrieve);

// add new member to the clubs
router.put('/clubs/:id/',clubs.newMember);



// Handle user requests
router.get('/users/new', users.new);

// router.post('/users', users.index);


// Export the router
module.exports = router;
