var side = 30;
var socket = io();
var btn = document.getElementById('btn'); //spring
var btn1 = document.getElementById('btn1'); //summer
var btn2 = document.getElementById('btn2'); //autumn
var btn3 = document.getElementById('btn3'); // winter

function setup() {
  frameRate(25);
  createCanvas(20 * side + 1, 20 * side + 1);
  background('#acacac');
}
btn.addEventListener('click', function onClick() {
    document.body.style.backgroundColor = '#ADFF2F';
  });
  btn1.addEventListener('click', function onClick() {
    document.body.style.backgroundColor = '#7FFFD4';
  });
  btn2.addEventListener('click', function onClick() {
    document.body.style.backgroundColor = '#FF8C00';
  });
  btn3.addEventListener('click', function onClick() {
    document.body.style.backgroundColor = '#87CEEB';
  });
function draww(matrix) {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) { //grass
        btn.addEventListener('click', function onClick() {
            fill("green");
        });
        btn1.addEventListener('click', function onClick() {
            fill("green");      
        });
        btn2.addEventListener('click', function onClick() { 
            fill("orange");        
        });
        btn3.addEventListener('click', function onClick() {      
            fill("winter");    
        });
        // rect(x * side, y * side, side, side);
      } else if (matrix[y][x] == 0) {
        fill("#acacac");
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
function BlackholeB() {
  socket.emit("Blackhole")
}
function RockB() {
  socket.emit("Rock")
}
function RandomB() {
  socket.emit("Random")
}

socket.on('send matrix', draww);