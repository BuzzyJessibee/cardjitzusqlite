/* 
  Card-Jitzu is Club Penguin's version of Rock, Paper, Scissors.
  As this is more of a demonstration of using sqlite3, I didn't
  implement the full rules of the game. It's just basic RPS, but if
  you reach a draw, the value of the card is taken into account.

  A full version of the game would include the rules for winning
  (three of a kind or one of each element) and would use the effects
  which currently go unused in this prototype. 

  All this aside, this was quite tricky to code, as sqlite isn't the most
  documented Node library out there. But here it is - without futher ado:
*/

const sqlite3 = require('sqlite3').verbose(); // import sqlite
const db = new sqlite3.Database('cards.db'); // create a link to the db file

let sql =
  // Uses INNER JOIN to get data from two tables
  'SELECT card_name, card_element, card_value, card_color, card_asset, card_effect FROM cards INNER JOIN card_data on card_data.card_ID = cards.card_ID';

// for ALL rows that are returned
db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }

  // Initialize what will eventually be the deck
  let card_array = [];

  // for every row the SQL returns, put it in the array
  rows.forEach((row) => {
    extractCardData(row, card_array);
  });

  // Pass the deck to the deckController
  deckController(card_array);

  // Close the database, we don't need it anymore
  db.close();
});

function extractCardData(row, card_array) {
  // Title case the name, since the API had some CAPS and some Title
  let title_name = toTitleCase(row.card_name);

  // Add card to the array
  card_array.push({
    card_name: title_name,
    element: row.card_element,
    value: row.card_value,
    color: row.card_color,
    asset: row.card_asset,
    effect: row.card_effect,
  });
}

function toTitleCase(str) {
  // Solves the issue of hyphens causing improper title case
  return str.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// https://stackoverflow.com/a/2450976
// Shuffles the Array so that we can have a random deck every run
function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function deckController(card_array) {
  // start by shuffling the deck
  let shuffledDeck = shuffleArray(card_array);

  // Draw a card randomly from the deck - more randomness =)
  let card1 = shuffledDeck[Math.floor(Math.random() * shuffledDeck.length)];

  // make the element user-readable so we can print it later. Also add colors =)
  let c1elementFull;
  switch (card1['element']) {
    case 'f':
      c1elementFull = '\033[91mFIRE\033[0m';
      break;
    case 's':
      c1elementFull = '\033[96mSNOW\033[0m';
      break;
    case 'w':
      c1elementFull = '\033[94mWATER\033[0m';
      break;
  }

  // Display the card to the user
  console.log(
    `Your card element is: ${c1elementFull} with a value of ${card1['value']}!`
  );

  // Draw a second card for the computer randomly from the deck - even more randomness =)
  let card2 = shuffledDeck[Math.floor(Math.random() * shuffledDeck.length)];

  // Make the element user-readable so we can print it later. Also add colors =)
  let c2elementFull;
  switch (card2['element']) {
    case 'f':
      c2elementFull = '\033[91mFIRE\033[0m';
      break;
    case 's':
      c2elementFull = '\033[96mSNOW\033[0m';
      break;
    case 'w':
      c2elementFull = '\033[94mWATER\033[0m';
      break;
  }

  // Display the card to the user
  console.log(
    `The computer's card element is: ${c2elementFull} with a value of ${card2['value']}!`
  );

  // seperate the cards from the result
  console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');

  // Decide the winner
  decideWinner(card1, card2);
}

function decideWinner(card1, card2) {
  /*  
  Fire beats Snow
  Water beats Fire
  Snow beats Water

  If the elements of the cards are the same, the card with the
  highest value wins the game.

  If the two cards have the same element and value, the game is
  a draw.

  I most likely could clean this up some but this is what I've
  gotten so far.
  
*/

  if (card1['element'] == 'f') {
    switch (card2['element']) {
      case 'f':
        console.log('Elements are the same, using value to decide winner...');
        console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
        if (parseInt(card1['value']) > parseInt(card2['value'])) {
          console.log('You win!');
        } else if (parseInt(card1['value']) == parseInt(card2['value'])) {
          console.log('Tie!');
        } else {
          console.log('I win!');
        }
        break;
      case 's':
        console.log('You win!');
        break;
      case 'w':
        console.log('I win!');
    }
  } else if (card1['element'] == 'w') {
    switch (card2['element']) {
      case 's':
        console.log('I win!');
        break;
      case 'w':
        console.log('Elements are the same, using value to decide winner...');
        console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
        if (parseInt(card1['value']) > parseInt(card2['value'])) {
          console.log('You win!');
        } else if (parseInt(card1['value']) == parseInt(card2['value'])) {
          console.log('Tie!');
        } else {
          console.log('I win!');
        }
        break;
      case 'f':
        console.log('You win!');
    }
  } else if (card1['element'] == 's') {
    switch (card2['element']) {
      case 'w':
        console.log('You win!');
        break;
      case 'f':
        console.log('I win!');
        break;
      case 's':
        console.log('Elements are the same, using value to decide winner...');
        console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
        if (parseInt(card1['value']) > parseInt(card2['value'])) {
          console.log('You win!');
        } else if (parseInt(card1['value']) == parseInt(card2['value'])) {
          console.log('Tie!');
        } else {
          console.log('I win!');
        }
        break;
    }
  }
}
