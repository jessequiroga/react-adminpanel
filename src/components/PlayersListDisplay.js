import React from "react";
import Game from "../model/Game";
import { Col, Container, Row } from "reactstrap";

function PlayersListDisplay({instanceListPlayer}) {

    let listTeamswithPlayer = null;
    if (Game.getInstance() && Game.getInstance().Teams && instanceListPlayer && Object.keys(instanceListPlayer).length > 0 && Object.keys(Game.getInstance().Teams).length > 0) {
        let _listPlayers = instanceListPlayer;
        let _listTeams = Game.getInstance().Teams;
    
        listTeamswithPlayer = Object.keys(_listTeams).map(function (keyT, index) // List Teams
        {
            let team = _listTeams[keyT];

            let listPlayersInTeam = Object.keys(_listPlayers).map(function (keyP, index) // List Players in current Team
            {
                let player = _listPlayers[keyP];
                if(player.Team !== null && typeof player.Team !== "undefined")
                {                
                    let afk = player.IsAfk;
                    if (player.Team.Id === team.Id)
                        return <span key={player.Id} style={afk?{textDecorationColor:"#848484",marginTop: "7px"}:{marginTop: "7px"}} className="text-center">{player.Name}{afk?"(AFK)":""}</span>;
                    else
                        return <></>;
                }
                else
                        return <></>;
            });

            return <Col key={index} sm={Game.getInstance().Teams.length > 3 ? '4' : '6'}>
                <div key={team.id}>
                    <div>
                        <span style={{ fontSize:"18px", fontWeight:"bold" }}>Team: <br/>{team.Name}</span>
                        <span style={{ backgroundColor: team.Color.toLowerCase(), display: "flex", width: "auto", height: "4px", marginTop: "7px" }} />
                    </div>
                    <div style={{ display: "grid" }}>
                        {listPlayersInTeam}
                    </div>
                </div>
            </Col>;

        });

    }

    return (
        <>
            {listTeamswithPlayer ?
                <Container>
                    <Row>
                        {listTeamswithPlayer}
                    </Row>
                </Container>
                : <span style={{ fontSize:"18px", fontWeight:"bold" }}>No Player</span>}
        </>
    );

}
export default PlayersListDisplay;