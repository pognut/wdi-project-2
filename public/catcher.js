//for catching game
// [{"ques" + api var + "tion": answer path in object}]
var easyQuestions = [{"What is this Pokemon's Pokedex number?":"id"}, {"What is this Pokemon's weight?":"weight"}, {"Who's that Pokemon?":"name"}]

var easyMons = ["Bulbasaur", "Charmander"]

// var mediumMons

// var hardMons

var questionSelector = function(diff){
  if(diff ===1){
    var index = Math.floor(Math.random() * (easyQuestions.length));
    return easyQuestions[index]
  }
}

var pokemonSelector = function(diff){
  if(diff===1){
    var index = Math.floor(Math.random() * (easyMons.length));
    return easyMons[index]
  }
}

var billsPC = function(name, num, img, type){
  var pokemon = {name:name, dex: num, sprite:img, types:type}
  $.ajax({
    "url": "/captured",
    "method": "POST",
    "data": pokemon,
    "success": function(pokemon){
      console.log('poke post success')
      window.location = '/';
      // window.location = pokemon.redirect
    }
  })
}

var quizMaster = function(data, questionNumber, corrects){
  $('#answerSubmit').off()
  var i = questionNumber;
  var right = corrects;
  $('#sprite').attr('src', data.sprites.front_default);
  $('#answerSubmit').on('click', function(e){
    e.preventDefault();
  })
  //question loop
  if(i <= 5){
    $('#questionTracker').text('Question: '+i+'/5')
    var questObj = questionSelector(1);
    var questStr = Object.keys(questObj);
    var questAns = questObj[questStr];
    $('#questionWindow').text(questStr);
    $('#answerSubmit').on('click', function(e){
      if($('#answerInput').val().toLowerCase()==data[questAns]){
        console.log('right')
        i++;
        if(i==6){
          $('#questionTracker').text('Question: 5/5')
        }
        else{
          $('#questionTracker').text('Question:'+i+'/5')
        }
        right++;
        quizMaster(data, i, right);
      }
      else{
        console.log('wrong')
        i++;
        if(i==6){
          $('#questionTracker').text('Question: 5/5')
        }
        else{
          $('#questionTracker').text('Question: '+i+'/5')
        }
        quizMaster(data, i, right);
        }
    })
  }
  //end success
  else if(right >=4){
    console.log('yay')
    if(data.types[1] == undefined){
    var typers = data.types[0].type.name
    }
    else{
    var typers = data.types[0].type.name + ", " + data.types[1].type.name;
    }
    billsPC(data.name, data.id, data.sprites.front_default, typers)
    //database post with poke-info goes here.

  }
  //end failure
  else{
    alert('The Pokemon got away! Try again.')
  }
}


var pokeInfo = function(diff){
  var pokeName = pokemonSelector(diff);
  var apiName = pokeName.toLowerCase();
  $.ajax({
    'url':'http://pokeapi.co/api/v2/pokemon/' + apiName,
    'method':'GET',
    'success': function(data){
      console.log('get success')
      console.log(data)
      quizMaster(data, 1, 0);
    }
  })
}

$('#easy').on('click', function(){
  pokeInfo(1);
})
