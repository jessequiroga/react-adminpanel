import React, { useState } from "react";
import Header from "./components/Header.js";
import GoogleMap from "./GoogleMap.js";
import Game from "./model/Game.js"

function App() {

  Game.getInstance(); //initiate the Game object
  return (
    <>
      <Header/>
      <GoogleMap  />
    </>
  );

}
export default App;

