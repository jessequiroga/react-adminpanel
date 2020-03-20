 
const createWebsocket = () => {
    var socket = new WebSocket("ws://cultwars.net:5000/ws");

    socket.onopen = function () {
        console.log("Connected.");
        socket.send('{"Players":[{"Items":[{"Type":"CultMag","CanChangeVisionDistance":false,"Quantity":0,"AvailableDuration":0,"CanTeleport":false,"DeficiencyDuration":0,"Position":[0.0,0.0],"VisionDistance":10,"ActionDistance":9,"Name":"OUI","IsInActionRange":false}],"IsAFK":false,"InventorySize":2,"Team":null,"VisibleEntities":[],"IsInZone":false,"EntitiesInView":null,"Position":[48.52862258260694,7.738950470522221],"VisionDistance":10,"ActionDistance":8,"Name":"Numil","IsInActionRange":false},{"Items":[],"IsAFK":false,"InventorySize":0,"Team":null,"VisibleEntities":[],"IsInZone":false,"EntitiesInView":null,"Position":[48.528636792858585,7.736761787966069],"VisionDistance":5,"ActionDistance":3,"Name":"Flo","IsInActionRange":false}],"Regions":[{"Coordinates":[[48.53101112845478,7.7336177050018495],[48.52689728697087,7.733285111084003],[48.527515450291084,7.7417072473907655],[48.53203420812144,7.7410849748993105],[48.5322899748082,7.734937351837177]],"Id":0}],"Items":[{"Type": "CultMag","CanChangeVisionDistance": false,"Quantity": 0,"AvailableDuration": 0,"CanTeleport": false,"DeficiencyDuration": 0,"Position": [48.52862258260694,7.734950470522221],"VisionDistance": 10,"ActionDistance": 9,"Name": "OUI","IsInActionRange": false}],"Flags":[],"Teams":[],"Name":"hug","Duration":"60","BeginDate":"2020-03-20T15:25:08.962Z","MinPlayer":"3","Ip":"127.0.0.1"}');
        
    }

    socket.onclose = function (event) {
        if (event.wasClean) {
            console.log('Disconnected.');
        } else {
            console.log('Connection lost.'); // for example if server processes is killed
        }
        console.log('Code: ' + event.code + '. Reason: ' + event.reason);
    };

    socket.onerror = function (error) {
        console.log("Error: " + error.message);
    };
    return socket;  
}
  
  export default class SocketController {
      static socket=null;

      static getSocket() {
          if(this.socket == null){
              this.socket = createWebsocket();
          }
          
          return this.socket;
      }
  
  }
