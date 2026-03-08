let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const thinking = document.querySelector("#thinking");

const restartBtn = document.querySelector("#restart-btn");

const modal = document.querySelector("#winnerModal");
const winnerText = document.querySelector("#winnerText");
const closeModal = document.querySelector("#closeModal");

const historyTable = document.querySelector("#history-table");

const timeDisplay = document.querySelector("#time");

/* TIMER */

let time = 0;

let timer = setInterval(() => {
  time++;
  timeDisplay.innerText = time;
}, 1000);

/* COMPUTER CHOICE */

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

/* DRAW GAME */

const drawGame = (userChoice, compChoice) => {

  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";

  const row = `
  <tr>
  <td>${userChoice}</td>
  <td>${compChoice}</td>
  <td>Draw</td>
  </tr>
  `;

  historyTable.innerHTML += row;

};

/* SHOW WINNER */

const showWinner = (userWin, userChoice, compChoice) => {

  let resultText = "";

  if (userWin) {

    userScore++;
    userScorePara.innerText = userScore;

    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";

    resultText = "Win";

  } else {

    compScore++;
    compScorePara.innerText = compScore;

    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";

    resultText = "Loss";
  }

  const row = `
  <tr>
  <td>${userChoice}</td>
  <td>${compChoice}</td>
  <td>${resultText}</td>
  </tr>
  `;

  historyTable.innerHTML += row;

  /* WINNER POPUP */

  if (userScore === 5) {
    winnerText.innerText = "🎉 You Won The Game!";
    modal.classList.add("show");
  }

  if (compScore === 5) {
    winnerText.innerText = "💻 Computer Won The Game!";
    modal.classList.add("show");
  }

};

/* GAME LOGIC */

const playGame = (userChoice) => {

  thinking.style.opacity = "1";

  setTimeout(() => {

    thinking.style.opacity = "0";

    const compChoice = genCompChoice();

    if (userChoice === compChoice) {

      drawGame(userChoice, compChoice);

    } else {

      let userWin = true;

      if (userChoice === "rock") {
        userWin = compChoice === "paper" ? false : true;
      } 
      else if (userChoice === "paper") {
        userWin = compChoice === "scissors" ? false : true;
      } 
      else {
        userWin = compChoice === "rock" ? false : true;
      }

      showWinner(userWin, userChoice, compChoice);

    }

  }, 1000);

};

/* CLICK EVENTS */

choices.forEach((choice) => {

  choice.addEventListener("click", () => {

    const userChoice = choice.getAttribute("id");
    playGame(userChoice);

  });

});

/* RESTART BUTTON */

restartBtn.addEventListener("click", () => {

  userScore = 0;
  compScore = 0;

  userScorePara.innerText = 0;
  compScorePara.innerText = 0;

  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";

  modal.classList.remove("show");

  /* TIMER RESET */

  time = 0;
  timeDisplay.innerText = 0;

  /* CLEAR TABLE */

  historyTable.innerHTML = "";

});

/* MODAL CLOSE */

closeModal.addEventListener("click", () => {

  modal.classList.remove("show");

  userScore = 0;
  compScore = 0;

  userScorePara.innerText = 0;
  compScorePara.innerText = 0;

  msg.innerText = "Play your move";

  time = 0;
  timeDisplay.innerText = 0;

  historyTable.innerHTML = "";

});
