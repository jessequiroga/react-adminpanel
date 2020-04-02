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
  const [gameInstance,setGameInstance] = useState(false);
  const [configNeeded,setConfigNeeded]  = useState(false); // MODIF false
  const [gameEnded,setGameEnded]  = useState(false);
  const [gameBegin,setGameBegin]  = useState(true);
  const [listPlayerOpen,setListPlayerOpen] = useState(false);
  const [instanceListPlayer,setInstanceListPlayer] = useState(Game.getInstance());
  const [time,setTime] = useState(new Date().toLocaleTimeString());
  
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
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      Game.getInstance()&&setInstanceListPlayer(Game.getInstance().Players);
    }, 1000);
    return () => clearInterval(id); // this "clean" function is executed here on component unmount
  }, []);
  
  return (
    <>  
        {configNeeded&&<MapConfigPannel setConfigNeeded={setConfigNeeded}/>}
        {gameInstance&&<Header setListPlayerOpen={setListPlayerOpen}/>}
        {gameInstance&&<GoogleMap/>}
        {gameInstance&&<ModalBeginGame gameBegin={gameBegin} instanceListPlayer={instanceListPlayer}/>}
        {gameInstance&&<ModalEndGame gameEnded={gameEnded}/>}
        {gameInstance&&<ModalListPlayer listPlayerOpen={listPlayerOpen} setListPlayerOpen={setListPlayerOpen} instanceListPlayer={instanceListPlayer}/>}
        {!gameInstance&&<span>No Game Instance For the moment sorry</span>}
    </>
  );

}
export default App;

