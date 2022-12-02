var LivingCreature = require("./living")
module.exports = class Persona extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 30;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character);
    }
    
    random(emptyCells) {
        return emptyCells[Math.floor(Math.random() * emptyCells.length)]
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = this.random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var newPersona = new Persona(newX, newY);
            personaArr.push(newPersona);
            this.energy = 8;
        }
    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = this.random(emptyCells);
        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY
        } else {
            this.die()
        }
    }

    eat() {
        var emptyCells = this.chooseCell(3);
        var newCell = this.random(emptyCells);

        var emptyCells1 = this.chooseCell(5);
        var newCell1 = this.random(emptyCells1);

        if (newCell1) {
            this.die();
        } else if (newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY
            if (this.energy > 15) {
                this.mul()
            }
            for (var i in rockArr) {
                if (newX == rockArr[i].x && newY == rockArr[i].y) {
                    rockArr.splice(i, 1);
                    break;
                }
            }

        } else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in personaArr) {
            if (this.x == personaArr[i].x && this.y == personaArr[i].y) {
                personaArr.splice(i, 1);
                break;
            }
        }
    }
}