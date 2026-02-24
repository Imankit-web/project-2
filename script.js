//Reading document 
let boxes= document.querySelectorAll("#box");
let resetgamebtn= document.querySelector("#resetbtn");
let newgamebtn = document.querySelectorAll(".newbtn");
let msg= document.querySelector("#msg");
let msg_draw= document.querySelector("#msg-draw");
let msgcontainer= document.querySelector(".msg-container");
let drawmsgcontainer= document.querySelector(".draw-msg-container");


let playerO= true;

//winning partern

let winpattern = [
  [0,1,2],[3,4,5],
  [6,7,8],[0,3,6],
  [1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// Turn counter 
let turncount = 0;
const drawcheck = () =>{
  if (turncount === 9){
    drawmsgcontainer.classList.remove("hide");
  }
};

// traversing in all boxes 
boxes.forEach((box)=>{
  box.addEventListener("click",() => {
    if(playerO){
      box.innerText= "O";
      playerO= false;
    }else{
      box.innerText="X";
      playerO= true;
    }
    box.disabled= true;
  turncount++;
  checkwiner();
  drawcheck();
  })
});

//disable boxes

const disablebox = () =>{
  for(let box of boxes){
    box.disabled = true;
  }
};

//winner checking 

const showiner = (winner) =>{
  msg.innerText= `Congratulation,winner is ${winner}.`
  msgcontainer.classList.remove("hide");
  disablebox();
};


const checkwiner = () =>{
  for (patterns of winpattern){
    
    let pos1val=boxes[patterns[0]].innerText;
    let pos2val=boxes[patterns[1]].innerText;
    let pos3val=boxes[patterns[2]].innerText;
    
    if (pos1val != "" && pos2val != "" && pos3val != "" ){
      if ( pos1val === pos2val && pos2val === pos3val){
        showiner(pos1val);
      }
    }
  }
};

//enable boxes 

const enablebox = () =>{
  for(let box of boxes){
    box.disabled = false;
    box.innerText= "";
  }
};

//reset boxes

const resetgame = () =>{
  player0 = true;
  enablebox();
  msgcontainer.classList.add("hide");
  drawmsgcontainer.classList.add("hide");
  turncount=0;
};

//add event listenerse 
newgamebtn.forEach((btn) => {
  btn.addEventListener("click",resetgame);
});


resetgamebtn.addEventListener("click",resetgame);