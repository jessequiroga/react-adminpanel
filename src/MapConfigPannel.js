import React from "react";
import SocketMessage from "./model/SocketMessage";
import SocketController from "./model/SocketController";

function MapConfigPannel({setConfigNeeded}) {
  
  let dragOverHandler = (event) => {  
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
  }

  let onFileDrop = (event) => {
    event.preventDefault();
    if(event.dataTransfer.items.length >0 && event.dataTransfer.items.length<2)
    {
      let dropElement = event.dataTransfer.items[0];
      if(dropElement.kind ==="file" && dropElement.type === "application/json")
      {
          let configFile = dropElement.getAsFile();
          if(configFile.name === "map.json")
          {
              let fr = new FileReader();
              let jsonMessage; 
              fr.onload = function() { //Read the fichier => this.result = file.text()
                  jsonMessage = new SocketMessage(this.result,SocketMessage.TypeMessage.GAMESETUP);
                  var conn = SocketController.getSocket();
                  conn.send(jsonMessage.toJson());
                  setConfigNeeded(false);
              };
              
              fr.readAsText(configFile); //Run fr.onload
              
          }
      }
    }
  }

  let browseUploadFile = (event) =>
  {
    console.log("browse");
    event.preventDefault();
  }

  let drop_zone = {
    border: "5px solid blue",
    width:  "200px",
    height: "100px",
  }
  
  return (
    <div onDragOver={dragOverHandler}>
        <span>Please upload a config file</span>
        <div id="drop_zone" onDrop={onFileDrop}  style={drop_zone}>
            <a href="#" onClick={browseUploadFile}>+</a>
            <p>Drag the config.json file to this Drop Zone ...</p>
        </div>
    </div>
  );

}
export default MapConfigPannel;

