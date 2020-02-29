import React, { useState } from "react";
import Header from "./components/Header.js";
import GoogleMap from "./GoogleMap.js";
import Game from "./model/Map.js"

function App() {

  Game.getInstance();
  return (
    <>
      <Header/>
      <GoogleMap  />
    </>
  );

}
export default App;

