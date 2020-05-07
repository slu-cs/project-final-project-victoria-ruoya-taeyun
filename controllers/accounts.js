// Controller for the account collection.
const Account = require('../models/account');

// GET /accounts
module.exports.index = function(request, response, next) {
  Account.distinct('_id')
    .then(accountIDs => response.redirect(`/accounts/${accountIDs[0]}`))
    .catch(error => next(error));
};

// GET /accounts/:id
module.exports.retrieve = function(request, response, next) {
  const queries = [
    Account.findById(request.params.id),
    Account.distinct('_id')
  ];

  Promise.all(queries).then(function([account, accountIDs]) {
    if (account) {
      response.render('clubs/index', {account: account, accountIDs: accountIDs});
    } else {
      next(); // No such club
    }
  }).catch(error => next(error));
};
