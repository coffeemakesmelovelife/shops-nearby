const express   = require('express');
const router    = express.Router();
const bcrypt    = require('bcryptjs');
const passport  = require('passport');
const crypto    = require('crypto');

// Bring in User Model
let User = require('../models/user');

// Register Proccess
router.post('/register', function(req, res){
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.repassword;

  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('repassword', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
    console.log(errors);
  } else {
    let newUser = new User({
      email:email,
      password:password,
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            //success
          }
        });
      });
    });
  }
});

// Login Process
router.post('/login', function(req, res, next){
  console.log(req.body);
  
  passport.authenticate('local', {
    successRedirect:'/dashboard',
    failureRedirect:'/users/login',
    failureFlash: true
  })(req, res, next);
});

// logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
