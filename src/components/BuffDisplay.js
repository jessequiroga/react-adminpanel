import React from "react";
import Game from "../model/Game";
import { Col, Container, Row } from "reactstrap";

import IconBuff from "../model/elements/IconBuff";

import Time from "../helper/Time";

function BuffDisplay({items}) {

    let listItems = null;
    if (typeof items === "object")
    {
        if (Game.getInstance() && items &&  Object.keys(items).length > 0 ) {
            let _listItems = items;
        
            listItems = Object.keys(_listItems).map(function (keyI, index) // List Teams
            {
                let item = _listItems[keyI];
                let icon = IconBuff[item.Type].url;
                return <Col key={keyI}>
                            <img style={{width: "60px"}} alt={item.Type} src={icon}></img>
                            {item.EndEffectTime && item.Type !== "PocheInterdimensionnelle"?<div>{Time.diffTime((new Date(item.EndEffectTime)),(new Date()))}</div>:null}
                        </Col>

            });

        }
    }

    return (
        <div style={{marginBottom: "5px"}}>
            <Container style={{borderStyle:"outset",borderWidth: "2px"}}>
                <span>Buff/DeBuff</span>
                <Row style={{borderStyle:"outset",borderWidth: "2px",backgroundColor:"#9d9b97a6"}}>
                {listItems ?listItems : <span style={{ fontSize:"18px", fontWeight:"bold" }}>Is Not affected</span>}
                </Row>                    
            </Container>
        </div>
    );

}
export default BuffDisplay;