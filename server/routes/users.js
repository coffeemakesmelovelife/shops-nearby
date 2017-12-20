const express   = require('express');
const router    = express.Router();
const bcrypt    = require('bcryptjs');
const passport  = require('passport');
const crypto    = require('crypto');

// Bring in User Model
let User = require('../models/user');

// Register Proccess
router.post('/register', function(req, res){
  console.log('received');
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
    return res.send({error: errors})
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
            return res.send({error: 'An error occured, please try again.'})
            return;
          } else {
            return res.send({success: 'Registered successfully.'})
            }
        });
      });
    });
  }
});

// Login Process
router.post('/login', passport.authenticate('local'), function(req, res){
  res.status(200).json({user: req.user._id});
});

// Like a shop
router.post('/like', function(req, res){
  console.log(req.body)
  User.findOneAndUpdate({_id: req.body.userId}, {$push: {preferredShops: req.body.shopId}}, function(err, user){
    if(err){
      console.log(err);
    }
    console.log(user);

  })
})

// Un-like a shop
router.post('/remove-liked', function(req, res){
  console.log(req.body);
  User.update({_id: req.body.userId}, { $pullAll: {preferredShops: [req.body.shopId]}}, function(err, user){
    if (err) {
      console.log(err);
    }
    console.log(user);
  })
})

// logout
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/users/login');
});

module.exports = router;
