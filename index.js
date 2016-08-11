const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const session = require('express-session');

/* BCrypt stuff here */
var bcrypt = require('bcrypt');
var salt = bcrypt.genSalt(1)

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'palatinus',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

var db = pgp('postgres://nicholasmichel@localhost:5432/trainer_db');

app.get('/', function(req,res){
  var logged_in,
      email;

  if(req.session.user){
    var logged_in = true;
    email = req.session.user.email;
    console.log('logged in')
  }

  var data = {
    "logged_in":logged_in,
    "email":email
  }
  res.render('index', data);
});

app.get('/logout', function(req,res){
  req.session.user = null;
  res.redirect('/');
});

app.post('/login', function(req, res){
  var data = req.body;
  console.log('login hit')
  db.one('SELECT * FROM trainers WHERE email = $1', [data.email])
  .catch(function(){
    res.send('Authorization failed. Check your email/password.');
  }).then(function(user){
    bcrypt.compare(data.password, user.password_digest, function(err, match){
      if(match){
        console.log(user)
        req.session.user = user;
        res.redirect('/');
      }
      else{
        console.log('boo')
        res.send('Authorization failed. Check your email/password.')
      }
    });
  });
});

app.get('/signup', function(req, res){
  res.render('signup/index')
})

app.post('/signup', function(req, res){
  console.log('signup route hit')
  var data = req.body;
  console.log(data)
  bcrypt.hash(data.password, 10, function(err, hashed_password){
    db.none('INSERT INTO trainers (email, password_digest) VALUES ($1, $2)', [data.email, hashed_password])
    .catch(function(){
      res.send('error, user could not be created')
    }).then(function(){
      res.send('user created')
    });
  });
});


app.listen(3000, function(){
  console.log('Server active.')
})