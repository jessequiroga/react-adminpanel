import React, { useState} from "react";
import {Card,Navbar,NavbarToggler,Button,Nav,Collapse} from 'reactstrap';
import "./app.css";


function Header() {

  const [isOpen, changeIsOpen] = useState(true); // Trigger toogle menu

  const toggle = () => { // Open/Close the menu
     changeIsOpen(!isOpen); // set true/false isOpen
  }

  return (
    <div>
    <Card className="border-1">
      <Navbar color="faded" className="border-1" light>
        <NavbarToggler onClick={toggle} className="mr-2" />
        <Collapse isOpen={!isOpen} navbar>
          <Nav navbar>
            <Nav>
              <NavItem className="mr-4">
                <Button onClick={()=>console.log("hello")}>Hello</Button>
              </NavItem>
            </Nav>
          </Nav>
        </Collapse>
      </Navbar>
    </Card>
  </div>
      );

}
export default Header;
