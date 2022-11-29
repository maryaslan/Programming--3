var side = 30;
var socket = io();
var weather = "winter";
var btn = document.getElementById('btn');
var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');


// function springB() {
//   weather = "spring";
// }
// function summerB() {
//   weather = "summer";
// }
// function autumnB() {
//   weather = "autumn";
// }
// function winterB() {
//   weather = "winter";
// }
function springB() {
  fill("green")
}
function summerB() {
  fill("green");
}
function autumnB() {
  fill("orange")
}
function winterB(){
  fill("white")
}

function setup() {
  frameRate(25);
  createCanvas(20 * side + 1,20 * side + 1);
  background('#acacac');
}

function draww(matrix) {
  
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 0) {
        fill("#acacac");
      } else if (matrix[y][x] == 1) { //grass
        fill("green");
        rect(x * side, y * side, side, side);
      } else if (matrix[y][x] == 2) { //grasseater
        fill("yellow");
      } else if (matrix[y][x] == 3) { //predator
        fill("#FF22E1");
      } else if (matrix[y][x] == 4) { //persona
        fill("#00FFFF");
      } else if (matrix[y][x] == 5) { //rock
        fill("#8B4513");
      } else if (matrix[y][x] == 6) { //blackhole
        fill("black");
      } 

      rect(x * side, y * side, side, side);


    }
  }
  
}

btn.addEventListener('click', function onClick(event) {
  document.body.style.backgroundColor = '#ADFF2F';
  if(matrix[y][x] == 1){
    fill("green");
  }
});
btn1.addEventListener('click', function onClick(event) {
  document.body.style.backgroundColor = '#7FFFD4';
  if(matrix[y][x] == 1){
    fill("green");
  }
});
btn2.addEventListener('click', function onClick(event) {
  document.body.style.backgroundColor = '#FF8C00';
  if(matrix[y][x] == 1){
    fill("orange");
  }
});
btn3.addEventListener('click', function onClick(event) {
  document.body.style.backgroundColor = '#87CEEB';
  if(matrix[y][x] == 1){
    fill("white");
  }
});
function ClearB() {
  socket.emit("Clear")
}
function GrassEaterB() {
  socket.emit("GrassEater")
}
function PredatorB() {
  socket.emit("Predator")
}
function GrassB() {
  socket.emit("Grass")
}
function PersonaB() {
  socket.emit("Persona")
}
function BlackholeB() {
  socket.emit("Blackhole")
}
function RockB() {
  socket.emit("Rock")
}
function StopB() {
  socket.emit("Stop")
}
function RandomB() {
  socket.emit("Random")
}

socket.on('send matrix', draww);