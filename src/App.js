import React, { useState } from "react";
import Header from "./components/Header.js";
import GoogleMap from "./GoogleMap.js";

function App() {
  const [canDrawMapZone, setCanDrawMapZone] = useState(false);
  const [canDrawAltar, setCanDrawAltar] = useState(false);
  const [canDrawItem, setCanDrawItem] = useState(false);

  const changeCanDrawItem = () => {
    setCanDrawItem(!canDrawItem);
    console.log(canDrawItem);
  }

  const changeCanDrawAltar = () => {
    setCanDrawAltar(!canDrawAltar);
    console.log(canDrawAltar);
  }

  const changeCanDrawMapZone = () => {
    setCanDrawMapZone(!canDrawMapZone);
    console.log(canDrawMapZone);
  }

  return (
    <>
      <Header changeCanDrawAltar={changeCanDrawAltar} changeCanDrawMapZone={changeCanDrawMapZone} changeCanDrawItem={changeCanDrawItem} />
      <GoogleMap  />
    </>
  );

}
export default App;

