//for everything but catching game

$('#signUp').on('submit', function(event){
  event.preventDefault();
  var email = $(this).children('#email').val();
  var password = $(this).children('#password').val();
  var trainer = {email:email, password:password};
  console.log('script connected')
  $.ajax({
    'url':'/signup',
    'method':'POST',
    'data':trainer,
    'success': function(trainer){
      console.log('post success')
      //gotta fix this
      window.location = '/'; //trainer.redirect
    }
  })
})

$('#logIn').on('submit', function(event){
  event.preventDefault();
  var email = $(this).children('#logemail').val();
  var password = $(this).children('#logpassword').val();
  var trainer = {email:email, password:password};
  console.log('script connected')
  $.ajax({
    'url':'/login',
    'method':'POST',
    'data':trainer,
    'success': function(trainer){
      console.log('post success')
      window.location = '/';
      //window.location = trainer.redirect
    }
  })
})

