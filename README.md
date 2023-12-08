# Brainstorm Quiz Game

You can test the game here: https://alban-care.github.io/brainstorm-quiz/

## Rules of the game

The game is a quiz game where you have to answer questions. This is inspired by the Trivial Pursuit game. The goal is to answer correctly to all the questions of the game in different categories.

## Dev explanation

In this game, i don't use state management like Redux or Mobx. I use the Context API of React to manage the state of the game. I use the Context API because the game is not very complex and i don't need to use a state management library.
The data is provided in JSON format directly in the data directory. It's a simple JSON file with an array of questions, but it is envisaged that in the future I will develop an API to serve the different applications that I have fun creating in my Github repository. 😅
