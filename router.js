// Router for content requests.
const express = require('express');
const clubs = require('./controllers/clubs');
const users = require('./controllers/users');

// Create the router
const router = express.Router();

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
//router.get('/clubs/:category',clubs.retreve);
//router.post('/clubs', authorize, clubs.create);
//router.delete('/clubs/:id', authorize, clubs.delete);
//router.put('/clubs/:id', authorize, clubs.update);

// Handle user requests
router.get('/users', users.index);
router.get('/users/:id', users.retrieve);
//router.get('/users', users.index);
//router.post('/users', authorize, users.create);
//router.delete('/users/:id', authorize, users.delete);
//router.put('/users/:id', authorize, users.update);

// Export the router
module.exports = router;
