var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);



app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, () => {
    console.log('Listening on localhost:3000');
});

Grass = require("./grass")
GrassEater = require("./grassEater");
Persona = require("./persona");
Predator = require("./predator");
Blackhole = require("./blackhole");
Rock = require("./rock");

grassArr = [];
grassEaterArr = [];
predatorArr = [];
personaArr = [];
rockArr = [];
blackholeArr = [];
matrix = [];

function generateMatrix(len, gr, grEat, predator, persona, rock, blackhole) {

    for (let i = 0; i < len; i++) {
        matrix[i] = []
        for (let j = 0; j < len; j++) {
            matrix[i][j] = 0
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * len);
        let y = Math.floor(Math.random() * len);
        if (matrix[y][x] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * len);
        let y = Math.floor(Math.random() * len);
        if (matrix[y][x] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < predator; i++) {
        let x = Math.floor(Math.random() * len);
        let y = Math.floor(Math.random() * len);
        if (matrix[y][x] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < persona; i++) {
        let x = Math.floor(Math.random() * len);
        let y = Math.floor(Math.random() * len);
        if (matrix[y][x] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < rock; i++) {
        let x = Math.floor(Math.random() * len);
        let y = Math.floor(Math.random() * len);
        if (matrix[y][x] == 0) {
            matrix[x][y] = 5;
        }
    }
    for (let i = 0; i < blackhole; i++) {
        let x = Math.floor(Math.random() * len);
        let y = Math.floor(Math.random() * len);
        if (matrix[y][x] == 0) {
            matrix[x][y] = 6;
        }
    }
    return matrix;
}
generateMatrix(30, 45, 25, 15, 20, 15, 15)

io.sockets.emit('send matrix', matrix);

function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y);
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let grEat = new GrassEater(x, y);
                grassEaterArr.push(grEat)
            } else if (matrix[y][x] == 3) {
                let predator = new Predator(x, y);
                predatorArr.push(predator)
            } else if (matrix[y][x] == 4) {
                let persona = new Persona(x, y);
                personaArr.push(persona)
            } else if (matrix[y][x] == 5) {
                let rock = new Rock(x, y);
                rockArr.push(rock);
            } else if (matrix[y][x] == 6) {
                let blackhole = new Blackhole(x, y);
                blackholeArr.push(blackhole);
            }
        }
    }
    io.sockets.emit('send matrix', matrix)
}

function game() {
    for (let i in grassArr) { 
        grassArr[i].mul()
        grassArr[i].eat()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }
    for (let i in predatorArr) {
        predatorArr[i].eat()
    }
    for (let i in personaArr) {
        personaArr[i].eat()
    }

    io.sockets.emit("send matrix", matrix);
}
setInterval(game, 600);

function RandomB() {
    generateMatrix(30, 45, 25, 15, 20, 15, 15)
    createObject();
    game();
}


function ClearB() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    personaArr = [];
    rockArr = [];
    blackholeArr = [];

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}

function GrassB() {
    let x = Math.floor(Math.random() * 25)
    let y = Math.floor(Math.random() * 25)
    if (matrix[y][x] == 0) {
        matrix[y][x] = 1
        grassArr.push(new Grass(x, y));
    }
}

function GrassEaterB() {
    let x = Math.floor(Math.random() * 25)
    let y = Math.floor(Math.random() * 25)
    if (matrix[y][x] == 0) {
        matrix[y][x] = 2
        grassEaterArr.push(new GrassEater(x, y));
    }
}

function PredatorB() {
    let x = Math.floor(Math.random() * 25)
    let y = Math.floor(Math.random() * 25)
    if (matrix[y][x] == 0) {
        matrix[y][x] = 3
        predatorArr.push(new Predator(x, y));
    }
}

function PersonaB() {
    let x = Math.floor(Math.random() * 25)
    let y = Math.floor(Math.random() * 25)
    if (matrix[y][x] == 0) {
        matrix[y][x] = 4
        personaArr.push(new Persona(x, y));
    }
}

function RockB() {
    let x = Math.floor(Math.random() * 25)
    let y = Math.floor(Math.random() * 25)
    if (matrix[y][x] == 0) {
        matrix[y][x] = 5
        rockArr.push(new Rock(x, y));
    }
}

function BlackholeB() {
    let x = Math.floor(Math.random() * 25)
    let y = Math.floor(Math.random() * 25)
    if (matrix[y][x] == 0) {
        matrix[y][x] = 6
        blackholeArr.push(new Blackhole(x, y));
    }
}

io.sockets.emit("send matrix", matrix);

io.on('connection', function (socket) {
    createObject();
    socket.on("Clear", ClearB);
    socket.on("GrassEater", GrassEaterB);
    socket.on("Grass", GrassB);
    socket.on("Predator", PredatorB);
    socket.on("Random", RandomB);
    socket.on("Persona", PersonaB);
    socket.on("Blackhole", BlackholeB);
    socket.on("Rock", RockB);
});