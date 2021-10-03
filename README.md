# Card-Jitzu using SQLite3

# Overview

A small project I used to learn how to use the node SQLite3 module. Based of a stripped down version of Club Penguin's Card-Jitzu game.

I've always wanted to learn how to use SQLite, as I heard that it was a very easy way to get a quick database set-up that used SQL, so I decided
to throw together a brief prototype using one of my favorite games as of late - Club Penguin's Card-Jitzu. 

Essentially, the game is just Rock Paper Scissors, but with a slight twist as the card values come into play if you end up drawing with your opponent.
While the full game has it's own set of rules and win conditions, this prototype is really just RPS with the values added in, just to give me an introduction
to SQLite before I went further making a discord bot that played the game.

The software uses a JSON file I made myself that includes the Starter Deck for CJ, that I compiled from [this JSON file](https://clubpenguin.fandom.com/wiki/Card-Jitsu_Cards#External_links)

[setupdatabase.js](setupdatabase.js) creates a database, extracts the data from the JSON file and puts it into two tables (learning to use JOIN!)

[index.js](index.js) is the main file. It reads the data from the database and creates a deck of cards. It then randomly picks a card for you and a card for the computer
and then compares the two to see who wins.

# Software Demo Video

[Software Demo Video](https://streamable.com/8yqubp)

# Relational Database

I used SQLite using the SQLite3 npm package. 
It's essentially just a SQL database, but LITE!


# Development Environment
- Visual Studio Code 
- Node v16.8.0
- SQLite3 v5.0.2

# Useful Websites

* [Club Penguin Wikia's Full JSON of all Card-Jitzu Cards](https://clubpenguin.fandom.com/wiki/Card-Jitsu_Cards#External_links)
* [Club Penguin Wikia's list of all cards in the starter deck](https://clubpenguin.fandom.com/wiki/Starter_Deck), as well as the [fire](https://clubpenguin.fandom.com/wiki/Fire_Booster_Deck) and [water](https://clubpenguin.fandom.com/wiki/Water_Booster_Deck) decks.
* [SQLite Node.JS Tutorial](https://www.sqlitetutorial.net/sqlite-nodejs/)

# Future Work
  A full version of the game would include the rules for winning
  (three of a kind or one of each element) and would use the effects
  which currently go unused in this prototype.
