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
            PLAYERCONNECT: "PLAYERCONNECT"
        }

    MessageType;
    ContainedEntity;

    constructor(Json,type=null) {
        if(type==null && typeof(Json) =="string")
        {
            var message = SocketMessage.getMessage(Json);
            this.MessageType = SocketMessage.TypeMessage[Object.keys(SocketMessage.TypeMessage)[message.Type]];
            switch(this.MessageType)
            {
                case "GAMESETUP":
                    this.ContainedEntity = message.Game;
                    break;
                case "NOMAP":
                    this.ContainedEntity = null;
                    break;
            }
            
        }
        if(type!=null && typeof(Json) =="object")
        {
            let findType = true;
            switch(type)
            {
                case "GAMESETUP":
                    this.ContainedEntity = JSON.stringify(Json); // Jsonised the map
                    break;
                default:
                    findType = false;
                    break;
            }
            if(findType)
            {
                this.MessageType = Object.keys(SocketMessage.TypeMessage).indexOf(type);
            }
            
        }
        if(type!=null && typeof(Json) =="string")
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
                default:
                    findType = false;
                    break;
            }
            if(findType)
            {
                this.MessageType = type ;
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
        console.log(jsonObject);
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
            default:
                break;
        }
        return result; 
    }

}

