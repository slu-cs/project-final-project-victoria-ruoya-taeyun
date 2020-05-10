// Controller for the club collection.
const Club = require('../models/club');

// GET /clubs
module.exports.index = function(request, response, next) {
  Club.distinct('_id')
    .then(clubIDs => response.redirect(`/clubs/${clubIDs[0]}`))
    .catch(error => next(error));
};

// GET /clubs/:id
module.exports.retrieve = function(request, response, next) {
  const queries = [
    Club.findById(request.params.id),
    Club.distinct('_id')
  ];

  Promise.all(queries).then(function([club, clubIDs]) {
    if (club) {
      response.render('clubs/index', {club: club, clubIDs: clubIDs});
    } else {
      next(); // No such club
    }
  }).catch(error => next(error));
};

// POST /club
module.exports.create = function(request, response, next) {
  Club.create(request.body)
    .then(club => response.status(201).send(club.id))
    .catch(error => next(error));
};

module.exports.new = function(request, response, next) {

  Club.distinct('_id')
    .then(clubIDs => response.render('clubs/index', {club: {}, clubIDs: clubIDs}))

    .catch(error => next(error));
}

// DELETE /club/:id
module.exports.delete = function(request, response, next) {
  Club.findByIdAndDelete(request.params.id)
    .then(club => club ? response.status(200).end() : next())
    .catch(error => next(error));
};

// PUT /club/:id
module.exports.update = function(request, response, next) {
  Club.findByIdAndUpdate(request.params.id, request.body,{runValidators: true})
    .then(function(club){ if(club) {response.status(200).end(); console.log(club);} else{next()}})
    .catch(error => next(error));
};

// PUT /clubs/newMember
module.exports.newMember = function(request, response, next) {
  //const lst = ;
  //const curClub = lst[-1];

//club = club.replace(/'/g,"");
  //console.log(Club.findById(request.body.id));

  Club.findByIdAndUpdate(request.body.id)
  .then(function(club){
    console.log(club);
    //console.log(Club.distinct(club));
    //club.memberList.push(request.session.user._id);
    //console.log(club.memberList);
  }).then(response.status(200).end())
  .catch(error => next(error));
};
