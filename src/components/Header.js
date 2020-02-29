import React, { useState} from "react";
import {Button, Nav, NavItem} from 'reactstrap';
import Game from '../model/Game.js';
function Header() {

  const saveMap = () => { // save the Map
    var map = Game.getInstance(); // get the current map
    var mapJsonised = JSON.stringify(map) // Jsonised the map
    console.log(mapJsonised);
  }

  return (
    <div>
      <Nav navbar>
        <Nav className="justify-content-center">
          <NavItem className="mr-4">
            <Button onClick={saveMap}>Save Map</Button>
          </NavItem>
        </Nav>
      </Nav>
    </div>
      );

}
export default Header;
