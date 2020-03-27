import React from "react";
import {Table } from 'reactstrap';
import Game from "../model/Game";

function PlayersListDisplay() {

    let listTeamswithPlayer = null;
    let listTeams = null;

    if (Game.getInstance() && Object.keys(Game.getInstance()).length > 0 && Object.keys(Game.getInstance().Players).length > 0 && Object.keys(Game.getInstance().Teams).length > 0) {
        let _listPlayers = Game.getInstance().Players;
        let _listTeams = Game.getInstance().Teams;

        listTeams = Object.keys(_listTeams).map(function (keyT, index) // List Teams
        {
            let team = _listTeams[keyT];
            console.log(team.Color.toLowerCase());
            return <th>
                {team.Name}
                <span style={{backgroundColor:team.Color.toLowerCase(),display: "flex", width: "auto",height: "10px"}}/>
            </th>
        });

        listTeamswithPlayer = Object.keys(_listTeams).map(function (keyT, index) // List Teams
        {
            let team = _listTeams[keyT];
            let listPlayersInTeam = Object.keys(_listPlayers).map(function (keyP, index) // List Players in current Team
            {
                let player = _listPlayers[keyP];
                if (player.Team.Id == team.Id)
                    return <td className="text-center">{player.Name}</td>;


            });
            console.log(listPlayersInTeam);
            return <tr key={team.id}>
                {listPlayersInTeam}
            </tr>;

        });

    }
    return (
        <>
            {listTeamswithPlayer ? <Table className="text-center">
                <thead>
                    <tr>
                        {listTeams}
                    </tr>
                </thead>
                <tbody>
                    {listTeamswithPlayer}
                </tbody>
            </Table> : <span>No Team</span>}
        </>
    );

}
export default PlayersListDisplay;



