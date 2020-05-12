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


// Create a new Club
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

// Delete a Club
// DELETE /club/:id
module.exports.delete = function(request, response, next) {
  Club.findByIdAndDelete(request.params.id)
    .then(club => club ? response.status(200).end() : next())
    .catch(error => next(error));
};


// Update Club information
// PUT /club/:id
module.exports.update = function(request, response, next) {
  console.log("next");
  Club.findByIdAndUpdate(request.params.id, request.body,{runValidators: true})
    .then(function(club){ if(club) {response.status(200).end();} else{next()}})
    .catch(error => next(error));
};

// PUT /clubs/newMember
module.exports.newMember = function(request, response, next) {
  console.log("next");
  Club.findById(request.params.id)
  .then(function(club){
    console.log(club.memberList);
    club.memberList.push(request.session.user._id);
    newMemberList = club.memberList;
  }).then(function(newMemberList){
    Club.findByIdAndUpdate(request.params.id, {memberList:newMemberList},{runValidators: true});
    console.log(newMemberList);
  }).then(function(club){ if(club) {response.status(200).end();} else{next()}})
    .catch(error => next(error));
};
  //const lst = ;
  //const curClub = lst[-1];

//club = club.replace(/'/g,"");
  //console.log(Club.find(club => club._id = request.body.id));
  //  Club.findById(request.body.id).
  //  then(function(club){
  //console.log(Club.findById(request.body.id));
