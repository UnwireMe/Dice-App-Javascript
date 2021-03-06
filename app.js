/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScores, activePlayer, gamePlaying, goalScore, diceArray, doubleSixTracker, rollResult;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    document.querySelector('.setGoal').disabled = true;
    goalScore = document.querySelector('.setGoal').value;
    //1. Random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    //Tracking double 6 roll via counter
    // if (dice == 6) {
    //   if (counter < 2) {
    //     counter += 1;
    //   } else if (counter > 1) {
    //     document.getElementById('score-' + activePlayer).textContent = '0';
    //     nextPlayer();
    //   };
    // } else if (dice != 6) {
    //   counter = 0;
    // };

    //Tracking double 6 roll via array
    // diceArray.unshift(dice);
    // diceArray.pop();
    // console.log(diceArray);

    //Verify double 6 rolls
    // rollResult = diceArray.every(e => e == 6);

    // if (rollResult) {
    //   document.getElementById('score-' + activePlayer).textContent = '0';
    //   nextPlayer();
    // }

    //2. Display result
    var diceDOM1 = document.querySelector('.dice');
    diceDOM1.style.display = 'block';
    diceDOM1.src = 'dice-' + dice1 + '.png';

    var diceDOM2 = document.querySelector('.dice2');
    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + dice2 + '.png';

    console.log(dice1, dice2);

    //3. Update the round score IF the rolled number was NOT a 1
    if (dice1 !== 1 && dice2 !== 1) {
      //add score
      roundScore += (dice1 + dice2);
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      //clear score
      document.getElementById('score-' + activePlayer).textContent = '0';
      //next player
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {

  if (gamePlaying) {
    goalScore = document.querySelector('.setGoal').value;
    //Add current score to global scores
    scores[activePlayer] += roundScore;

    //Update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    if (scores[activePlayer] >= goalScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice1').style.display = 'none';
      document.querySelector('.dice2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  diceArray = [0,0];
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice1').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
}

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  diceArray = [0,0];

  // document.querySelector('.dice').style.display = 'none';
  document.querySelector('.setGoal').disabled = false;

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
};

document.querySelector('.btn-new').addEventListener('click', init);
