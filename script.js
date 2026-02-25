// Select elements
let boxes = document.querySelectorAll("#box");
let resetgamebtn = document.querySelector("#resetbtn");
let newgamebtn = document.querySelectorAll(".newbtn");
let msg = document.querySelector("#msg");
let msg_draw = document.querySelector("#msg-draw");
let msgcontainer = document.querySelector(".msg-container");
let drawmsgcontainer = document.querySelector(".draw-msg-container");

let playerO = true;
let turncount = 0;
let gameOver = false; // ✅ Prevent extra clicks after winner

// Winning patterns
let winpattern = [
  [0,1,2],[3,4,5],
  [6,7,8],[0,3,6],
  [1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// Box click
boxes.forEach((box)=>{
  box.addEventListener("click",() => {

    if (gameOver) return; // Stop if game ended

    if(playerO){
      box.innerText = "O";
      playerO = false;
    } else {
      box.innerText = "X";
      playerO = true;
    }

    box.disabled = true;
    turncount++;

    checkwiner();
    drawcheck();
  });
});

// Disable all boxes
const disablebox = () =>{
  for(let box of boxes){
    box.disabled = true;
  }
};

// Enable all boxes
const enablebox = () =>{
  for(let box of boxes){
    box.disabled = false;
    box.innerText = "";
  }
};

// Show winner
const showiner = (winner) =>{
  msg.innerText = `Congratulations, winner is ${winner} 🎉`;
  msgcontainer.classList.remove("hide");
  disablebox();
  gameOver = true;

  // ✅ Scroll to top
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

// Check winner
const checkwiner = () =>{
  for (let pattern of winpattern){

    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val !== "" && pos2val !== "" && pos3val !== ""){
      if (pos1val === pos2val && pos2val === pos3val){
        showiner(pos1val);
        return; // Stop checking after winner
      }
    }
  }
};

// Check draw
const drawcheck = () =>{
  if (turncount === 9 && !gameOver){
    drawmsgcontainer.classList.remove("hide");
    gameOver = true;

    // ✅ Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
};

// Reset game
const resetgame = () =>{
  playerO = true;  // ✅ fixed bug
  turncount = 0;
  gameOver = false;

  enablebox();
  msgcontainer.classList.add("hide");
  drawmsgcontainer.classList.add("hide");
};

// Event listeners
newgamebtn.forEach((btn) => {
  btn.addEventListener("click", resetgame);
});

resetgamebtn.addEventListener("click", resetgame);