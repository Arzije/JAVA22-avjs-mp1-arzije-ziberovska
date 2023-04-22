import { getPlayersAndScore, displayPlayersAndScore, addNewPlayerAndScore } from './highscore.js';

class Game {

  constructor() {
    this.playerNameValue = '';
    this.playerName = document.querySelector('#playerName');
    this.displayName = document.querySelector('#displayName');
    this.displayPlayerChoice = document.querySelector('#displayPlayerChoice');
    this.displayComputerChoice = document.querySelector('#displayComputerChoice');
    this.displayPlayerScore = document.querySelector('#displayPlayerScore');
    this.displayComputerScore = document.querySelector('#displayComputerScore');
    this.displayResult = document.querySelector('#displayResult');
    this.displayGameResult = document.querySelector('#displayGameResult');
    this.startGame = document.querySelector('#startGame');
    this.buttons = [...document.querySelectorAll('.choiceButtons')];
    this.playerScore = 0;
    this.computerScore = 0;


   this.startGame.addEventListener('click', this.welcomePlayer.bind(this));
    this.buttons.forEach(button => {
      button.addEventListener('click', () => this.play(button.id));
    });
  }

  async welcomePlayer(event) {
    event.preventDefault();
    this.playerNameValue = this.playerName.value;
    this.displayName.textContent = `Welcome, ${this.playerNameValue}!`;
    this.playerName.value = '';
    this.playerScore = 0;
  }

  async play(playerChoice) {
    this.displayPlayerChoice.textContent = `Player choice: ${playerChoice}`;
    const computerChoice = this.getComputerChoice();
    this.displayComputerChoice.textContent = `Computer choice : ${computerChoice}`;

    const result = this.getResult(playerChoice, computerChoice);
    if (result === 'win') {
      this.playerScore++;
    } else if (result === 'lose') {
      this.playerScore = 0;
    }

    this.displayPlayerScore.textContent = `Player score : ${this.playerScore}`;
    this.displayComputerScore.textContent = `Computer score : ${this.computerScore}`;
    this.displayResult.textContent = `Result: ${result}`;

    if (result === 'win') {
      this.displayGameResult.textContent = `${this.playerNameValue} wins!`;
    } else if (result === 'lose') {
      this.displayGameResult.textContent = `Computer wins!`;
    }

    const player = this.playerNameValue;
    const score = this.playerScore;

    await addNewPlayerAndScore(player, score);

    const newData = await getPlayersAndScore();
    displayPlayersAndScore(newData);
  }

  getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  getResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
      return 'draw';
    } else if (playerChoice === 'rock' && computerChoice === 'scissors' ||
      (playerChoice === 'paper' && computerChoice === 'rock') ||
      (playerChoice === 'scissors' && computerChoice === 'paper')) {
      return 'win';
    } else {
      return 'lose';
    }
  }

}

export { Game }
