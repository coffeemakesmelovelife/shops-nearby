const express          = require('express')
const mongoose         = require('mongoose')
const path             = require('path')
const bodyParser       = require('body-parser')
const cors             = require('cors')
const expressValidator = require('express-validator')
const session          = require('express-session')
const passport         = require('passport')
const config           = require('./config/database')
const port             = process.env.PORT || 3000


mongoose.connection.openUri(config.database, {
  keepAlive: 120
});
let db = mongoose.connection;

db.once('open', function(){
  console.log('Connected to MongoDB');
});

db.on('error', function(err){
  console.log(err);
});


const app = express()

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors())

// Express Session Middleware
app.use(session({
  secret: 'may the force be with you',
  resave: true,
  saveUninitialized: true
}));

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});


// Route Files
let dashboard = require('./routes/dashboard');
let users = require('./routes/users');
app.use('/dashboard', dashboard);
app.use('/users', users);


app.listen(port, function(){
  console.log('Server started on port : ' + port);
})
