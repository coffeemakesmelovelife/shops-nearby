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
    var expiredDislikes = []
    for(var i = 0; i<user.dislikedShops.length; i++){
      if(!dislikeHasExpired(user.dislikedShops[i].createdAt)){
        shopsToHide.push(user.dislikedShops[i].shop)
      } else {
        //removing expired dislikes from the user
        expiredDislikes.push(i)
      }
    }
    Shop.find({_id: {$nin: shopsToHide}}, function(err, shops){
      sortByDistance(shops, [req.body.userLoc.lat, req.body.userLoc.lon])
      var page = req.body.page || 1
      var pageSize = 9
      var numPages = Math.ceil(shops.length / pageSize)
      var shopsToServe = shops.slice((page-1)*pageSize, (page-1)*pageSize+pageSize)
      res.send({shops: shopsToServe, page: page, numPages: numPages})
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
      var page = req.body.page || 1
      var pageSize = 9
      var numPages = Math.ceil(shops.length / pageSize)
      var shopsToServe = shops.slice((page-1)*pageSize, (page-1)*pageSize+pageSize)
      res.send({shops: shopsToServe, page: page, numPages: numPages})
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
  if (((Date.now() - dateCreated) / 60000) > 120) { //2 hours
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
