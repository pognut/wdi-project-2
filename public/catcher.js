//for catching game
// [{"ques" + api var + "tion": answer path in object}]
var easyQuestions = [{"What is this Pokemon's Pokedex number?":"id"}, {"What is this Pokemon's weight?":"weight"}]

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



var quizMaster = function(data){
  $('body').append('<div id = quizWindow>');
  $('#quizWindow').append('<h3 id = questionWindow>');
  $('#quizWindow').append('<form id = answerWindow>');
  $('#answerWindow').append('<input id = answerInput>')
  $('#answerWindow').append('<button id="answerSubmit" type="submit">Submit</button>')
  var questObj = questionSelector(1);
  var questStr = Object.keys(questObj);
  var questAns = questObj[questStr];
  $('#questionWindow').text(questStr);
  $('#answerSubmit').on('click', function(e){
    e.preventDefault();
    if($('#answerInput').val()==data[questAns]){
      console.log('right')
    }
    else{
      console.log('wrong')
    }
  })
  //bring up quiz window
  //fill in questions
  //record answers
  //display question difficulty, questions to go, number of wrongs etc.
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
      quizMaster(data);
    }
  })
}

$('#easy').on('click', function(){
  pokeInfo(1);
  // quizMaster();
})
