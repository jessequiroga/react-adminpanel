import React from "react";
import Game from "../model/Game";

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
                    return <span className="text-center">{player.Name}</span>;


            });
            return <div key={team.id} style={{marginRight:"20px",border:"2px",borderStyle:"solid"}}>
                <div>
                    <span>{team.Name}</span>
                    <span style={{backgroundColor:team.Color.toLowerCase(),display: "flex", width: "auto",height: "10px"}}/>
                </div>
                <div style={{display:"grid"}}>
                    {listPlayersInTeam}
                </div>
            </div>;

        });

    }
    
    return (
        <>
            {listTeamswithPlayer ? <div style={{display:"flex",width:"auto"}} className="text-center">
                    {listTeamswithPlayer}
            </div> : <span>No Team</span>}
        </>
    );

}
export default PlayersListDisplay;



