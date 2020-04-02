import Game from "./Game";
export default class SocketMessage {
    static TypeMessage =
        {
            ADMINCONNECT: "ADMINCONNECT",
            POS: "POS",
            ACTION: "ACTION",
            USEITEM: "USEITEM",
            GAMESETUP: "GAMESETUP",
            NOMAP: "NOMAP",
            PLAYERCONNECT: "PLAYERCONNECT",
            ENTITYUPDATE:"ENTITYUPDATE",
            ENTITYDELETE:"ENTITYDELETE",
            ENTITYADD:"ENTITYADD",
            OK:"OK"
        }

    MessageType;
    ContainedEntity;

    constructor(Json,type=null) {
        if(type==null && typeof(Json) =="string") //Read
        {
            let findType = true;
            var message = SocketMessage.getMessage(Json);

            let messageType = SocketMessage.TypeMessage[Object.keys(SocketMessage.TypeMessage)[message.Type]];
            switch(messageType)
            {
                case "GAMESETUP":
                    this.ContainedEntity = message.Game;
                    break;
                case "PLAYERCONNECT":
                    this.ContainedEntity = message.Players; // Jsonised the map
                    break;
                case "NOMAP":
                    this.ContainedEntity = null;
                    break;
                case "Pos":
                    this.ContainedEntity = message.Players;
                default:
                    findType = false;
                    break;
            }
            if(findType)
            {
                this.MessageType = messageType;
            }
            
        }
        if(type!=null && typeof(Json) =="object") //Write with object
        {
            let findType = true;
            if(Object.keys(SocketMessage.TypeMessage).indexOf(type) != -1)
            {
                this.ContainedEntity = JSON.stringify(Json); // Jsonised the map
                this.MessageType = type;
            }
            
        }
        if(type!=null && typeof(Json) =="string") //Write with string
        {
            let findType = true;
            switch(type)
            {
                case "GAMESETUP":
                    this.ContainedEntity = Json; // Jsonised the map
                    break;
                case "ADMINCONNECT":
                    this.ContainedEntity = null;
                    break;
                case "ENTITYADD":
                    this.ContainedEntity = null;
                    break;
                default:
                    findType = false;
                    break;
            }
            if(findType)
            {
                this.MessageType = type;
            }
        }
    }

    static getMessage(Json) {
        try {
            var message = JSON.parse(Json);
        }
        catch (e) {
            return null;
        }

        return message;
    }

    toJson(){
        let result ="";
        let jsonObject = {Type:Object.keys(SocketMessage.TypeMessage).indexOf(this.MessageType)}
        switch(this.MessageType)
        {
            case "GAMESETUP":
                jsonObject.Game = JSON.parse(this.ContainedEntity);
                result = JSON.stringify(jsonObject);
                break;
            case "NOMAP":
                result = null;
                break;
            case "ADMINCONNECT":
                result = JSON.stringify(jsonObject);
                break;
            case "ENTITYADD":
                jsonObject.push(JSON.parse(this.ContainedEntity));
                result = JSON.stringify(jsonObject);
                break;
            case "POS":
                jsonObject.push(JSON.parse(this.ContainedEntity));
                result = JSON.stringify(jsonObject);
                break;
            default:
                break;
        }
        return result; 
    }

}

