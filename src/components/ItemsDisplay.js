import React from "react";
import Game from "../model/Game";
import { Col, Container, Row } from "reactstrap";

import ItemManager from "../model/elements/ItemManager";

function ItemsDisplay({items}) {

    let listItems = null;
    if (Game.getInstance() && items && Object.keys(items).length > 0 ) {
        let _listItems = items;
    
        listItems = Object.keys(_listItems).map(function (keyI, index) // List Teams
        {
            let item = _listItems[keyI];
            let icon = ItemManager.getIcon("CultMag").url;
            return <Row key={keyI}>
                        <img src={icon}></img>
                    </Row>

        });

    }

    return (
        <>
            {listItems ?
                <Container>
                    <Col>
                        {listItems}
                    </Col>                    
                </Container>
                : <span style={{ fontSize:"18px", fontWeight:"bold" }}>No Items</span>}
        </>
    );

}
export default ItemsDisplay;