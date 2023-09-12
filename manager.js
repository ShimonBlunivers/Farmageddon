
export class Manager {
    constructor(gameID, player) {
        this.gameID = gameID;
        this.player = player;
    }

    printGameID() {
        console.log(this.gameID);
    }
}