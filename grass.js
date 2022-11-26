var LivingCreature = require("./living")
module.exports = class Grass extends LivingCreature {
    random(d){
        let found = this.chooseCell(d);
        let result = Math.floor(Math.random()*found.length)
        return found[result];
    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = this.random(emptyCells);

        // console.log(emptyCells, newCell);
        if (newCell && this.multiply >= 4) {

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
