import React, { useState} from "react";
import {Button, Nav, NavItem} from 'reactstrap';
import SocketMessage from '../model/SocketMessage';
import SocketController from "../model/SocketController";
function Header() {

  const saveMap = () => { // save the Map
    var configMessage = new SocketMessage(SocketMessage.TypeMessage.GAMESETUP).ContainedEntity;
    console.log(configMessage);
    SocketController.getSocket().send(configMessage)
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
