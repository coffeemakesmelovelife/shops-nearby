const express = require('express');
const router = express.Router();
const bcrypt    = require('bcryptjs');

let User = require('../models/user')

router.get('/', ensureAuthenticated, function(req, res){
  //here the magic will happen
})

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}

module.exports = router;
