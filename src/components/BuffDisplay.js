import React from "react";
import Game from "../model/Game";
import { Col, Container, Row } from "reactstrap";

import ItemManager from "../model/elements/ItemManager";

function BuffDisplay({items}) {

    let listItems = null;
    if (Game.getInstance() && items && Object.keys(items).length > 0 ) {
        let _listItems = items;
    
        listItems = Object.keys(_listItems).map(function (keyI, index) // List Teams
        {
            let item = _listItems[keyI];
            let icon = ItemManager.getIcon(item.Type).url;
            return <Col key={keyI}>
                        <img style={{width: "60px"}} src={icon}></img>
                    </Col>

        });

    }

    return (
        <>
            {listItems ?
                <Container style={{borderStyle:"outset",borderWidth: "2px"}}>
                    <span>BackPack</span>
                    <Row style={{borderStyle:"outset",borderWidth: "2px",backgroundColor:"#9d9b97a6"}}>
                        {listItems}
                    </Row>                    
                </Container>
                : <span style={{ fontSize:"18px", fontWeight:"bold" }}>No Items</span>}
        </>
    );

}
export default BuffDisplay;