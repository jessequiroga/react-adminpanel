import React from "react";
import Game from "../model/Game";
import { Col, Container, Row } from "reactstrap";

function PlayersListDisplay() {

    let listTeamswithPlayer = null;

    if (Game.getInstance() && Object.keys(Game.getInstance()).length > 0 && Object.keys(Game.getInstance().Players).length > 0 && Object.keys(Game.getInstance().Teams).length > 0) {
        let _listPlayers = Game.getInstance().Players;
        let _listTeams = Game.getInstance().Teams;

        listTeamswithPlayer = Object.keys(_listTeams).map(function (keyT, index) // List Teams
        {
            let team = _listTeams[keyT];
            let listPlayersInTeam = Object.keys(_listPlayers).map(function (keyP, index) // List Players in current Team
            {
                let player = _listPlayers[keyP];
                if (player.Team.Id == team.Id)
                    return <span className="text-center" style={{ marginTop: "7px" }} >{player.Name}</span>; 


            });

            return <Col xs="6" sm="4">
                <div key={team.id}>
                    <div>
                        <span style={{ fontSize:"18px", fontWeight:"bold" }}>Team {team.Name}</span>
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
                : <span>No Team</span>}
        </>
    );

}
export default PlayersListDisplay;



