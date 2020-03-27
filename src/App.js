import React,{useState,useEffect} from "react";
import Header from "./components/Header.js";
import GoogleMap from "./GoogleMap.js";
import SocketMessage from "./model/SocketMessage";
import SocketController from "./model/SocketController";
import MapConfigPannel from "./MapConfigPannel";
import Game from "./model/Game";
import ModalEndGame from "./ModalEndGame";
import ModalBeginGame from "./ModalBeginGame";


function App() {
  let [gameInstance,setGameInstance] = useState(false);
  let [configNeeded,setConfigNeeded]  = useState(false);
  let [gameEnded,setGameEnded]  = useState(false);
  let [gameBegin,setGameBegin]  = useState(true);
  
  /*Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }
  console.log((new Date()).addDays(1).toJSON());*/

  useEffect(() => { // On Open Admin 
    let conn = SocketController.getSocket();
    conn.onmessage = function(event){
      var message = new SocketMessage(event.data);
      console.log("MessageServeur",message);
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
            let this_game = Game.getInstance(game);
            if((new Date()) > (new Date(this_game.EndDate)))
            {
              setGameEnded(true);
            }
            else if((new Date(this_game.BeginDate)) > (new Date()))
            {
              setGameBegin(false);
            }
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
        {gameInstance&&<ModalBeginGame gameBegin={gameBegin}/>}
        {gameInstance&&<ModalEndGame gameEnded={gameEnded}/>}
        {!gameInstance&&<span>No Game Instance For the moment sorry</span>}
    </>
  );

}
export default App;

