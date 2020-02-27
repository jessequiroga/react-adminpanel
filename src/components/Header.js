import React, { useState} from "react";
import {Card,Navbar,NavbarToggler,Nav,Collapse,NavItem} from 'reactstrap';

function Header() {

  const [isOpen, changeIsOpen] = useState(false); // Trigger toogle menu

  const toggle = () => { // Open/Close the menu
     changeIsOpen(!isOpen); // set true/false isOpen
  }

  return (
    <div>
    <Card className="border-1">
      <Navbar color="faded" className="border-1" light>
        <NavbarToggler onClick={toggle}/>
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <Nav className="justify-content-center">
              <NavItem className="mr-4">
                
              </NavItem>
              <NavItem className="mr-4">

              </NavItem>
              <NavItem className="mr-4">

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
