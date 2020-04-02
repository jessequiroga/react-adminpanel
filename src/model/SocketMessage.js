import Game from "./Game";
function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if(obj[i] instanceof Object && obj[i] !== null && !(obj[i] instanceof Date) && ((Array.isArray(obj[i]) && obj[i][0] instanceof Object) || !Array.isArray(obj[i]) ))
      {
        if(obj[i] instanceof Array)
        {
          target[i] = Object.values(_objectWithoutProperties(obj[i],keys));
        }
        else
          target[i] = _objectWithoutProperties(obj[i],keys);
      }
      else
      {
        if(obj[i] instanceof Array)
        {
          target[i] = Object.values(obj[i]);
        }
        else
          target[i] = obj[i];
      }
      
    }
    return target;
  }

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
            FLAGUPDATE:"FLAGUPDATE",
            FLAGDELETE:"FLAGDELETE",
            FLAGADD:"FLAGADD",
            OK:"OK",
            REGIONADD:"REGIONADD",
            ITEMADD:"ITEMADD",
            ITEMUPDATE:"ITEMUPDATE",
            ITEMDELETE:"ITEMDELETE"
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
                case "POS":
                    this.ContainedEntity = message.Player;
                    break;
                case "OK":
                this.ContainedEntity = null;
                    break;
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
            if(Object.keys(SocketMessage.TypeMessage).indexOf(type) != -1)
            {
                this.ContainedEntity = JSON.stringify(_objectWithoutProperties(Json,["MapEntity"])); // Jsonised the map
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
            case "FLAGADD":
            case "FLAGUPDATE":
            case "FLAGDELETE":
                jsonObject.Flag = JSON.parse(this.ContainedEntity);
                result = JSON.stringify(jsonObject);
                break;
            case "ITEMADD":
            case "ITEMUPDATE":
            case "ITEMDELETE":
                jsonObject.Item = JSON.parse(this.ContainedEntity);
                result = JSON.stringify(jsonObject);
                break;
            case "REGIONYADD":
            case "REGIONUPDATE":
            case "REGIONDELETE":
                jsonObject.Region = JSON.parse(this.ContainedEntity);
                result = JSON.stringify(jsonObject);
                break;
            case "POS":
                jsonObject.Player = JSON.parse(this.ContainedEntity);
                result = JSON.stringify(jsonObject);
                break;
            default:
                break;
        }
        return result; 
    }

}

