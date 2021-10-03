const sqlite3 = require('sqlite3').verbose();

// create our database file, or link to it if it already exists.
const db = new sqlite3.Database('cards.db');

// the raw json card data
const cardsJSON = require('./cardstarter.json');

// Create our tables, cards and card_data and link card_data on the foreign key card_ID so we can join them later.
db.run(
  'CREATE TABLE IF NOT EXISTS cards (pk INTEGER PRIMARY KEY, card_ID TEXT, card_name TEXT)'
);
db.run(
  'CREATE TABLE IF NOT EXISTS card_data (pk INTEGER PRIMARY KEY, card_element TEXT, card_value TEXT, card_color TEXT, card_asset TEXT, card_effect INTEGER, card_effect_desc TEXT, card_ID INTEGER, FOREIGN KEY (card_ID) REFERENCES cards (card_ID));'
);

// serialize gurantees only one command runs at a time.
// Loop through the JSON and add each card to the 'cards' database.
db.serialize(function () {
  for (var i = 0; i < cardsJSON.length; i++) {
    db.run(
      `INSERT INTO cards (card_ID, card_name) VALUES ("${cardsJSON[i]['card_id']}", "${cardsJSON[i]['name']}")`
    );
  }
});

/*
  There were some things to explain here so I split it into two commands.
  Thanks to how the JSON file is set up, cards that have no effect have "null"
  as the field value, and if they do have an effect, they have an effect_desc,
  whereas the other cards don't.

  This code checks to see if effect is null. If it is, it sets the 'effect' variable to 0
  to store it in the database.

  If the JSON entry has an 'effect_desc' field then it copies that to the database, otherwise
  it just passes an empty string to make things easier.
*/
db.serialize(function () {
  for (var i = 0; i < cardsJSON.length; i++) {
    let effect;
    let effect_desc;

    if (!cardsJSON[i]['effect']) {
      effect = 0;
    } else {
      effect = cardsJSON[i]['effect'];
    }

    if (!cardsJSON[i]['effect_desc']) {
      effect_desc = '';
    } else {
      effect_desc = cardsJSON[i]['effect_desc'];
    }

    db.run(
      `INSERT INTO card_data (card_element, card_value, card_color, card_asset, card_effect, card_effect_desc, card_ID) VALUES ("${cardsJSON[i]['element']}", "${cardsJSON[i]['value']}", "${cardsJSON[i]['color']}", "${cardsJSON[i]['asset']}", "${effect}", "${effect_desc}", "${cardsJSON[i]['card_id']}")`
    );
  }
});

// For debugging purposes, drops the two tables that we've created.
// Make sure to drop cards first, as card_data is linked so SQL won't delete it.
/* 
db.run('DROP TABLE cards');
db.run('DROP TABLE card_data');
 */

// close the database - good practice.
db.close();
