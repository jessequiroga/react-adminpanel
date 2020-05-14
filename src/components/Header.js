import React, { useState} from "react";
import {Button, Nav, NavItem} from 'reactstrap';
import SocketMessage from '../model/SocketMessage';
import SocketController from "../model/SocketController";
import Game from "../model/Game";
function Header({setListPlayerOpen}) {

  const showListPlayer = () =>
  {
    setListPlayerOpen(true);
  }

  return (
    <div>
      <Nav navbar>
        <Nav className="justify-content-center">
          <NavItem className="mr-4">
            {/*<Button onClick={saveMap}>Save Map</Button>*/}
          </NavItem>
          <NavItem className="mr-4">
            <Button onClick={showListPlayer}>Show Connected Players</Button>
          </NavItem>
        </Nav>
      </Nav>
    </div>
      );

}
export default Header;
