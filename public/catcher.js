//for catching game
// ["ques" + api var + "tion"]
var easyQuestions = ["What is this Pokemon's Pokedex number?"]

var easyMons = ["Bulbasaur"]

// var mediumMons

// var hardMons

var questionSelector = function(diff){
  if(diff ===1){
    var index = Math.floor(Math.random() * (easyQuestions.length + 1));
    return easyQuestions[index]
  }
}

var pokemonSelector = function(diff){
  if(diff===1){
    var index = Math.floor(Math.random() * (easyMons.length + 1));
    return easyMons[index]
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
    }
  })
}

// var quizMaster



$('#easy').on('click', function(){
  pokeInfo(1);
})
