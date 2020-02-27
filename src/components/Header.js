import React from "react";
import {Card,Navbar,Button,NavItem} from 'reactstrap';

function Header() {

  return (
    <div>
    <Card className="border-1">
      <Navbar color="faded" className="text-center border-1" light>
              <NavItem className="mr-4">
                <Button onClick={()=>console.log("hello")}>Hello</Button>
              </NavItem>
      </Navbar>
    </Card>
    </div>
      );

}
export default Header;
