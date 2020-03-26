import React,{useState,useEffect} from "react";
import Header from "./components/Header.js";
import GoogleMap from "./GoogleMap.js";
import SocketMessage from "./model/SocketMessage";
import SocketController from "./model/SocketController";
import MapConfigPannel from "./MapConfigPannel";
import Game from "./model/Game";

function App() {
  let [gameInstance,setGameInstance] = useState(false);
  let [configNeeded,setConfigNeeded]  = useState(true);
  
  useEffect(() => { // On Open Admin 
    let conn = SocketController.getSocket();
    conn.onmessage = function(event){
      var message = new SocketMessage(event.data);
      switch(message.MessageType)
      {
        case SocketMessage.TypeMessage.NOMAP:
          setConfigNeeded(true);
          break;
        case SocketMessage.TypeMessage.GAMESETUP:
          if(Game.getInstance() == null)
          {
            let game = message.ContainedEntity;
            setGameInstance(true);
            Game.getInstance(game);
          }
          break;
      }
    }    
  }, []);
  
  return (
    <>
        {configNeeded&&<MapConfigPannel setConfigNeeded={setConfigNeeded}/>}
        {gameInstance&&<Header/>}
        {gameInstance&&<GoogleMap/>}
        {!gameInstance&&<span>No Game Instance For the moment sorry</span>}
    </>
  );

}
export default App;

