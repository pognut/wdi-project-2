$('#signIn').on('submit', function(event){
  event.preventDefault();
  var email = $(this).children('#email').val();
  var password = $(this).children('#password').val();
  var trainer = {email:email, password:password};
  console.log('script connected')
  $.ajax({
    'url':'/signup',
    'method':'POST',
    'data':trainer,
    'success': function(data){
      console.log('post success')
      window.location.replace("http://localhost:3000/")
    }
  })
})
