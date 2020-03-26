import SocketMessage from "./SocketMessage";
const createWebsocket = () => {
    var socket = new WebSocket("ws://cultwars.net:5000/ws");

    socket.onopen = function () {
        console.log("Connected.");
       socket.send((new SocketMessage("{}",SocketMessage.TypeMessage.ADMINCONNECT).toJson()));        
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
