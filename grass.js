var LivingCreature = require("./living")
module.exports = class Grass extends LivingCreature {
    random(emptyCells) {
        return emptyCells[Math.floor(Math.random() * emptyCells.length)]
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]


        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }

    eat() {
        var emptyCells = this.chooseCell(6);
        var newCell = this.random(emptyCells);
        if (newCell) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in grassArr) {
            if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                grassArr.splice(i, 1);
                break;
            }
        }
    }

}
