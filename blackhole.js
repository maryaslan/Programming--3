var LivingCreature = require("./living")
module.exports = class Blackhole extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 17;
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
    random(){
        let found = this.chooseCell(0);
        let result = Math.floor(Math.random()*found.length)
        return found[result];
    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = this.random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 6;

            var newblackholeArr = new Blackhole(newX, newY);
            blackholeArr.push(newblackholeArr);
            this.energy = 17;
        }
    }

}