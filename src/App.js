import React,{useState,useEffect} from "react";
import Header from "./components/Header.js";
import GoogleMap from "./GoogleMap.js";
import SocketMessage from "./model/SocketMessage";
import SocketController from "./model/SocketController";
import MapConfigPannel from "./MapConfigPannel";
import Game from "./model/Game";
import ModalEndGame from "./components/ModalEndGame";
import ModalBeginGame from "./components/ModalBeginGame";
import ModalListPlayer from "./components/ModalListPlayer";


function App() {
  let [gameInstance,setGameInstance] = useState(false);
  let [configNeeded,setConfigNeeded]  = useState(true); // MODIF false
  let [gameEnded,setGameEnded]  = useState(false);
  let [gameBegin,setGameBegin]  = useState(true);
  let [listPlayerOpen,setListPlayerOpen] = useState(false);
  
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

  useEffect(() => { // On Game.getInstance().Players change
    if(Game.getInstance()&&Game.getInstance().Players!=null)
      console.log("newPlayer");
  }, [(Game.getInstance()&&Game.getInstance().Players!=null&&Game.getInstance().Players)]);
  
  return (
    <>  
        {configNeeded&&<MapConfigPannel setConfigNeeded={setConfigNeeded}/>}
        {gameInstance&&<Header setListPlayerOpen={setListPlayerOpen}/>}
        {gameInstance&&<GoogleMap/>}
        {gameInstance&&<ModalBeginGame gameBegin={gameBegin}/>}
        {gameInstance&&<ModalEndGame gameEnded={gameEnded}/>}
        {gameInstance&&<ModalListPlayer listPlayerOpen={listPlayerOpen} setListPlayerOpen={setListPlayerOpen}/>}
        {!gameInstance&&<span>No Game Instance For the moment sorry</span>}
    </>
  );

}
export default App;

