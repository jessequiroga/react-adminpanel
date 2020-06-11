import React,{useState,useEffect} from "react";
import GoogleMap from "./GoogleMap.js";
import SocketMessage from "./model/SocketMessage";
import SocketController from "./model/SocketController";
import MapImportConfigPannel from "./MapImportConfigPannel";
import styled from "styled-components";
import MapConfigPannel from "./form/MapConfigPannel";
import Game from "./model/Game";
import ModalEndGame from "./components/ModalEndGame";
import ModalBeginGame from "./components/ModalBeginGame";

const MapContainer = styled.div`
position: fixed;
width: 100%;
height: 100%;
left: 0;
top: 0;
z-index: 10;
`


function App() {
  const [gameInstance,setGameInstance] = useState(false);
  const [configJsonNeeded,setConfigJsonNeeded]  = useState(false); // MODIF false
  const [gameEnded,setGameEnded]  = useState(false);
  const [gameBegin,setGameBegin]  = useState(true);
  const [instanceListPlayer,setInstanceListPlayer] = useState(Game.getInstance());
  const [tick,setTick] = useState(null);
  const [config,setConfig]= useState(false);
  const [configOpen,changeConfigOpen] = useState(false);

  const openConfig = () =>{
    changeConfigOpen(true);
  }

  const initWebsocket= () => {
    let conn = SocketController.getSocket();
    conn.onmessage = function(event){
      var message = new SocketMessage(event.data);
      switch(message.MessageType)
      {
        case SocketMessage.TypeMessage.NOMAP:
          setConfigJsonNeeded(true);
          break;
        case SocketMessage.TypeMessage.GAMESETUP:
          if(!config)
          {
            let game = message.ContainedEntity;
            let this_game = Game.getInstance(game);
            if(this_game.IsFinal)
            {
              setGameInstance(true);
              if(((new Date()) > (new Date(this_game.EndDate) )&& this_game.Type == Game.GameType.TIME))
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
  }

  useEffect(() => {
    let game = Game.getInstance();
    if(game){
      initWebsocket();
      game.IsFinal = false;
      let jsonMessage = new SocketMessage(game,SocketMessage.TypeMessage.GAMESETUP);
      var conn = SocketController.getSocket();
      conn.send(jsonMessage.toJson());
      setGameEnded(false);
      setGameInstance(false);
    }
  },[configOpen]);
  
  useEffect(() => { // On Open Admin
    initWebsocket();
    const id = setInterval(() => {
      Game.getInstance()&&setInstanceListPlayer(Game.getInstance().Players);
    }, 1000);
    setTick(id);
    return () => clearInterval(id); // this "clean" function is executed here on component unmount
  }, []);
  



  return (
    <MapContainer>  
        {configJsonNeeded&&<MapImportConfigPannel setConfigJsonNeeded={setConfigJsonNeeded} setConfig= {setConfig}/>}
        {config&&<MapConfigPannel Config={config} setConfig={setConfig}/>}
        {gameInstance&&<GoogleMap/>}
        {gameInstance&&<ModalBeginGame gameBegin={gameBegin} instanceListPlayer={instanceListPlayer} tick={tick}/>}
        {gameInstance&&<ModalEndGame gameEnded={gameEnded} openConfig={openConfig}/>}
        <div style={{textAlign: "center",paddingTop: "20%"}}>
          {!gameInstance&& !configJsonNeeded && !config &&<span style={{ color:"grey", fontSize:"22px", fontWeight:"bold" }}>Game Server Is Down</span>}
        </div>
    </MapContainer>
  );

}
export default App;

