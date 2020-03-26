import React, { useState} from "react";
import {Button, Nav, NavItem} from 'reactstrap';
import SocketMessage from '../model/SocketMessage';
import SocketController from "../model/SocketController";
import Game from "../model/Game";
function Header() {

  const saveMap = () => { // save the Map
    var configMessage = new SocketMessage(Game.getInstance(),SocketMessage.TypeMessage.GAMESETUP);
    console.log(configMessage);
    SocketController.getSocket().send(configMessage.toJson());
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
