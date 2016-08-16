const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const session = require('express-session');

try {
  require('./env');
} catch(e){
}

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

var db = pgp(process.env.DATABASE_URL);

app.get('/', function(req,res){
  var logged_in,
      email;

  if(req.session.user){
    var logged_in = true;
    email = req.session.user.email;
    console.log('logged in')
    db.any('SELECT * FROM pokemon WHERE trainers_id = ' + req.session.user.id)
    .then(function(data){
        var pokes = {
          "logged_in":logged_in,
          "email":email,
          "info":data
          }
        res.render('index', pokes);
            })
        }
  else{
  var data = {
    "logged_in":logged_in,
    "email":email
  }
  res.render('index', data);
}
});

app.get('/catch', function(req,res){
  if(req.session.user){
    res.render('catch/index')
  }
  else{
    res.redirect('/')
  }
})

app.get('/logout', function(req,res){
  req.session.user = null;
  res.redirect('/');
});

app.post('/login', function(req, res){
  var data = req.body;
  console.log('login hit')
  db.one('SELECT * FROM trainers WHERE email = $1', [data.email])
  .catch(function(){
    alert('Authorization failed. Check your email/password.');
    res.redirect('/login')
  }).then(function(user){
    bcrypt.compare(data.password, user.password_digest, function(err, match){
      if(match){
        req.session.user = user;
        res.send({redirect: '/'})
      }
      else{
        alert('Authorization failed. Check your email/password.')
        res.redirect('/login')
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
  bcrypt.hash(data.password, 10, function(err, hashed_password){
    db.none('INSERT INTO trainers (email, password_digest) VALUES ($1, $2)', [data.email, hashed_password])
    .catch(function(){
      console.log('Login failed, please try again.')
      res.send({redirect: '/'});
    }).then(function(){
      res.send({redirect: '/'});
    });
  });
});

app.post('/captured', function(req, res){
  console.log('capture route hit')
  var pokeData = req.body;
  var id = req.session.user.id;
  db.none('INSERT INTO pokemon (name, dex, sprite, types, trainers_id) VALUES ($1, $2, $3, $4, $5)', [pokeData.name, pokeData.dex, pokeData.sprite, pokeData.types, id])
  .catch(function(){
    alert('Error, please try again.')
    res.redirect('/catch')
  }).then(function(){
    res.send({redirect: '/'})
  })
})

// app.listen(3000, function(){
//   console.log('Server active.')
// })

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function(){
  console.log('Node app is running on port', app.get('port'));
});

// const express = require('express');
// const app = express();
// const pgp = require('pg-promise')();
// const mustacheExpress = require('mustache-express');


// app.engine('html', mustacheExpress());
// app.set('view engine', 'html');
// app.set('views', __dirname + '/views');
// app.use("/", express.static(__dirname + '/public'));


// var db = pgp(process.env.DATABASE_URL);

// app.get('/', function(req, res) {
//     db.any('SELECT * FROM messages').then(function(data) {
//         var template_data = {
//             messages: data
//         }
//         res.render('index', template_data);
//     });
// });


// app.set('port', (process.env.PORT || 5000));

// app.listen(app.get('port'), function(){
//   console.log('Node app is running on port', app.get('port'));
// });
