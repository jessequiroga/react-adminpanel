import React,{useState,useEffect} from "react";
import GoogleMap from "./GoogleMap.js";
import SocketMessage from "./model/SocketMessage";
import SocketController from "./model/SocketController";
import MapImportConfigPannel from "./MapImportConfigPannel";
import MapConfigPannel from "./form/MapConfigPannel";
import Game from "./model/Game";
import ModalEndGame from "./components/ModalEndGame";
import ModalBeginGame from "./components/ModalBeginGame";

function App() {
  const [gameInstance,setGameInstance] = useState(false);
  const [configJsonNeeded,setConfigJsonNeeded]  = useState(false); // MODIF false
  const [gameEnded,setGameEnded]  = useState(false);
  const [gameBegin,setGameBegin]  = useState(true);
  const [instanceListPlayer,setInstanceListPlayer] = useState(Game.getInstance());
  const [time,setTime] = useState(new Date().toLocaleTimeString());
  const [config,setConfig]= useState(false);
  
  useEffect(() => { // On Open Admin 
    let conn = SocketController.getSocket();
    conn.onmessage = function(event){
      var message = new SocketMessage(event.data);
      switch(message.MessageType)
      {
        case SocketMessage.TypeMessage.NOMAP:
          setConfigJsonNeeded(true);
          break;
        case SocketMessage.TypeMessage.GAMESETUP:
          console.log(message.ContainedEntity);
          if(!config)
          {
            let game = message.ContainedEntity;
            let this_game = Game.getInstance(game);
            if(this_game.IsFinal)
            {
              setGameInstance(true);
              if((new Date()) > (new Date(this_game.EndDate) && this_game.Type == Game.GameType.TIME))
              {
                setGameEnded(true);
              }
              else if((new Date(this_game.BeginDate)) > (new Date()))
              {
                setGameBegin(false);
              }
            }
            else
            {
              setConfig(this_game);
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
        {configJsonNeeded&&<MapImportConfigPannel setConfigJsonNeeded={setConfigJsonNeeded} setConfig= {setConfig}/>}
        {config&&<MapConfigPannel Config={config}/>}
        {gameInstance&&<GoogleMap/>}
        {gameInstance&&<ModalBeginGame gameBegin={gameBegin} instanceListPlayer={instanceListPlayer}/>}
        {gameInstance&&<ModalEndGame gameEnded={gameEnded}/>}
        <div style={{textAlign: "center",paddingTop: "20%"}}>
          {!gameInstance&& !configJsonNeeded &&<span style={{ color:"grey", fontSize:"22px", fontWeight:"bold" }}>Game Server Is Down</span>}
        </div>
    </>
  );

}
export default App;

