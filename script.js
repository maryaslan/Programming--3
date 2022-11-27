var side = 30;
var socket = io();
var weather = 'winter';

function springB() {
  weather = 'spring';
}
function summerB() {
  weather = 'summer';
}
function autumnB() {
  weather = 'autumn';
}
function winterB() {
  weather = 'winter';
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
        if (springB()) {
          fill("green")
        }
        else if (summerB()) {
          fill("green");
        }
        else if (autumnB()) {
          fill("orange")
        }
        else if (winterB()) {
          fill("white")
        }
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
function StopB() {
  socket.emit("Stop")
}
function RandomB() {
  socket.emit("Random")
}
function SpringB() {
  socket.emit("Spring")
}
function SummerB() {
  socket.emit("Summer")
}
function AutumnB() {
  socket.emit("Autumn")
}
function WinterB() {
  socket.emit("Winter")
}
socket.on('send matrix', draww);