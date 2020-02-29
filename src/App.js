import React, { useState } from "react";
import Header from "./components/Header.js";
import GoogleMap from "./GoogleMap.js";
import Game from "./model/Game.js";
import * as game from "./data/map.json";

function App() {
  var isEmpty = (Object.keys(game.default).length > 0); // id the json is not empty
  isEmpty?Game.getInstance(game):Game.getInstance(); //initiate the Game object or take the json
  return (
    <>
      <Header/>
      <GoogleMap  />
    </>
  );

}
export default App;

