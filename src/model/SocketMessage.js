import Game from "./Game";
export default class SocketMessage {
    static TypeMessage =
        {
            ADMINCONNECT: "ADMINCONNECT",
            POS: "POS",
            ACTION: "ACTION",
            USEITEM: "USEITEM",
            GAMESETUP: "GAMESETUP"
        }

    MessageType;
    ContainedEntity;
    GameConfigFile;

    constructor(type) {
        this.MessageType = type;
        var map = Game.getInstance(); // get the current map
        this.ContainedEntity = JSON.stringify(map) // Jsonised the map
    }

    static getType(Json) {
        try {
            var game = JSON.parse(Json);
        }
        catch (e) {
            return null;
        }

        return game;
    }
}

