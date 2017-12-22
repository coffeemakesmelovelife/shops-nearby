const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const geolib  = require('geo-lib')

let Shop = require('../models/shop');
let User = require('../models/user');

//List shops nearby
router.post('/shops', function(req, res){
  User.findOne({_id: req.body.userId}, function(err, user){
    var shopsToHide = user.preferredShops
    var validDislikes = 0
    var expiredDislikes = []
    console.log(user.dislikedShops.length);
    for(var i = 0; i<user.dislikedShops.length; i++){
      console.log("wtf");
      if(!dislikeHasExpired(user.dislikedShops[i].createdAt)){
        shopsToHide.push(user.dislikedShops[i].shop)
        validDislikes++
      } else {
        //removing expired dislikes from the user
        expiredDislikes.push(i)
      }
    }
    console.log('Liked', user.preferredShops);
    console.log('Disliked valid', validDislikes);
    Shop.find({_id: {$nin: shopsToHide}}, function(err, shops){
      console.log(shops.length);
      sortByDistance(shops, [req.body.userLoc.lat, req.body.userLoc.lon])
      res.send(shops)
    })
    //updating the user if needed
    if (expiredDislikes.length>0) {
      user.dislikedShops.splice(expiredDislikes)
      user.save(function(err, usr){
        if (err) {
          console.log(err);
        }
        console.log(usr);
      })
    }
  })
})

//List preferred shops nearby
router.post('/preferred-shops', function(req, res){
  User.findOne({_id: req.body.userId}, function(err, user){
    Shop.find({_id: user.preferredShops}, function(err, shops){
      sortByDistance(shops, [req.body.userLoc.lat, req.body.userLoc.lon])
      res.send(shops)
    })
  })
})

//Sort shops by distance
function sortByDistance(shops, usrLoc){
  //adds a temporary field of (the variant) distance
  for(var i = 0; i<shops.length; i++){
    shops[i].location.dist = geolib.distance([usrLoc,[shops[i].location.coordinates[1], shops[i].location.coordinates[0]]]).distance
  }
  //sorts shops by distance before populating the homepage
  shops.sort(function(a, b){
    return a.location.dist - b.location.dist;
  })
  return shops;
}

//Disliked Shop Timespan Control
function dislikeHasExpired(dateCreated){
  //Converting time since created from milliseconds to minutes
  console.log(((Date.now() - dateCreated) / 60000));
  if (((Date.now() - dateCreated) / 60000) > 1) {
    return true
  }
  return false
}

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/users/login');
  }
}

module.exports = router;
