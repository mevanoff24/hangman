phrases = [
"NewYork","LosAngeles","Chicago","Houston","Philadelphia","Phoenix","SanAntonio","SanDiego","Dallas","SanJose","Austin","Indianapolis","Jacksonville","SanFrancisco","Columbus","Charlotte","FortWorth","Detroit","ElPaso","Memphis","Seattle","Denver","WashingtonDC","Boston","NashvilleDavidson","Baltimore","OklahomaCity","LouisvilleJeffersonCounty","Portland","LasVegas","Milwaukee","Albuquerque","Tucson","Fresno","Sacramento","LongBeach","KansasCity","Mesa","VirginiaBeach","Atlanta","ColoradoSprings","Omaha","Raleigh","Miami","Oakland","Minneapolis","Tulsa","Cleveland","Wichita","Arlington",
];
var targetWord = '';
var guesses = [];
var uniqueGuesses = [];
var maxLives = 9;

// function loadPhrases() {
//   var p = $.ajax({
//     type: 'get',
//     url: 'city_list',
//     dataType: 'json',
//     async: false
//   });

//   p.done(function(city) {
//     $.each(city, function(index, city) {
//       phrases.push(city.text);
//     })
//   });
// };

function getPhrase() {
  return targetWord = phrases[Math.floor(Math.random() * phrases.length)];
};

function underscorePhrase() {
  var renderedWord = ''
  for (index = 0; index < targetWord.length; index++) {
    if (guesses.indexOf(targetWord[index].toLowerCase(), 0) === -1) {
      renderedWord += '_ ';
    }
    else {
      renderedWord += targetWord[index];
    }
  }
  return renderedWord
};

function drawPhrase() {
  while (targetWord === ' ') {
    getPhrase();
  }
  $('#target_word').html(underscorePhrase());
};

function receivePhrase() {
  guesses.sort();
  $('#guesses').text(guesses.join(''))
};

function correctGuess() {
  $.each(guesses, function(letter, index) {
    if (letter.length > 0 && $.inArray(letter, uniqueGuess) === -1) {
      uniqueGuess.push(letter);
    }
  })
  guesses = uniqueGuesses;
};

function addGuess() {
  if (/^[a-zA-Z]*$/.test($('#current_guess').val())) {
    guesses.push($('#current_guess').val());
  }
  $('#current_guess').val('');
};

function livesRemaining() {
  var livesLeft = maxLives;

  for (var index = 0; index < guesses.length; index ++ ) {
    if (targetWord.indexOf(guesses[index], 0) === -1) {
      livesLeft -= 1
    }
  }
    switch (livesLeft) {
    case 8: drawHead();break;
    case 7: drawTorso(); break;
    case 6: drawLeftArm(); break;
    case 5: drawRightArm(); break;
    case 4: drawLegBox(); break;
    case 3: drawPelvis(); break;
    case 2: drawLeftLeg(); break;
    case 1: drawRightLeg(); break;
    case 0: gameOver(false); break;
  }
};

function winner() {
  if (underscorePhrase() === targetWord) {
    gameOver(true);
    clearGame();
  }
};

function gameOver(won) {
  if (won) {
    $('#game_end').alert("You guessed " + targetWord + " in " + guesses.length + " guesses!")
  }
  else {
    $('#game_end').html("The word was " + targetWord + "!")
  }
};

function update() {
  addGuess();
  correctGuess();
  drawPhrase();
  receivePhrase();
  livesRemaining();
  winner();
}

function clearGame() {
  getPhrase();
  drawPhrase();
  receivePhrase();
  guesses = [];
  uniqueGuesses = [];
  needsUpdate1 = true;
  needsUpdate2 = true;
  needsUpdate3 = true;
  needsUpdate4 = true;
  needsUpdate5 = true;
  needsUpdate6 = true;
  needsUpdate7 = true;
  needsUpdate8 = true;
  $('.draw-area').empty();
  $('#game_end').empty();
  $('#game_end').empty();
}

var needsUpdate1 = true;
var needsUpdate2 = true;
var needsUpdate3 = true;
var needsUpdate4 = true;
var needsUpdate5 = true;
var needsUpdate6 = true;
var needsUpdate7 = true;
var needsUpdate8 = true;


function drawHead() {
  if (needsUpdate1) {
    $('.draw-area').append($('<div></div>').addClass('rope'));
    $('.draw-area').append($('<div></div>').addClass('head'));
  needsUpdate1 = false;
}};

function drawTorso() {
  if (needsUpdate2) {
      $('.draw-area').append($('<div></div>').addClass('torso'));
 needsUpdate2 = false;
}};

function drawLeftArm() {
  if (needsUpdate3) {
    $('.draw-area').append($('<div></div>').addClass('left_arm'));
    needsUpdate3 = false;
}};

function drawRightArm() {
  if (needsUpdate4) {
    $('.draw-area').append($('<div></div>').addClass('right_arm'));
    needsUpdate4 = false;
}};

function drawLegBox() {
  if (needsUpdate5) {
  $('.draw-area').append($('<div></div>').addClass('legbox'));
  needsUpdate5 = false;
}};

function drawPelvis() {
  if (needsUpdate6) {
    $('.draw-area').append($('<div></div>').addClass('pelvis'));
    needsUpdate6 = false;
}};

function drawLeftLeg() {
  if (needsUpdate7) {
    $('.draw-area').append($('<div></div>').addClass('left_leg'));
    needsUpdate7 = false;
}};

function drawRightLeg() {
  if (needsUpdate8) {
    $('.draw-area').append($('<div></div>').addClass('right_leg'));
    needsUpdate8 = false;
}};

$(document).ready(function() {
  // loadPhrases();
  getPhrase();
  drawPhrase();
  receivePhrase();
  $('#current_guess').attr('onkeyup', 'update();');

  $("#restart").on('click', function() {
    $.ajax({
      // url: "/hangman"
    }).done(function(){
      clearGame();
    })
  });
})