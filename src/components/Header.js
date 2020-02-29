import React, { useState} from "react";
import {Button, Nav, NavItem} from 'reactstrap';
import Game from '../model/Map.js';
function Header() {

  const saveMap = () => {
    var map = Game.getInstance();
    console.log(map);
    var mapJsonised = JSON.stringify(map)
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
