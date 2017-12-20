const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const geolib  = require('geo-lib')

let Shop = require('../models/shop');
let User = require('../models/user');

router.post('/shops', function(req, res){
  Shop.find({}, function(err, shops){
    var usrLoc = [req.body.userLoc.lat, req.body.userLoc.lon]
    //console.log('User loc coord: ', );
    //console.log('Shop loc coord: ', shops[0].location.coordinates);
    for(var i = 0; i<shops.length; i++){
      //console.log('User loc :', usrLoc);
      //console.log('Shop loc :', shops[i].location.coordinates[1]);
      console.log('Distance between shop and user '
      +geolib.distance([usrLoc,[shops[i].location.coordinates[1], shops[i].location.coordinates[0]]]).distance
      +' '+ geolib.distance([usrLoc,[shops[i].location.coordinates[1], shops[i].location.coordinates[0]]]).unit);

    }
    res.send(shops)
  })
})

router.post('/preferred-shops', function(req, res){
  //console.log(req.body);
  User.findOne({_id: req.body.userId}, function(err, user){
    //console.log(user);
    const preferredShops = user.preferredShops
    //console.log(preferredShops);
    Shop.find({_id: preferredShops}, function(err, shops){
      //console.log(shops);
      res.send(shops)
    })
  })
})

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/users/login');
  }
}

module.exports = router;
