import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table } from 'reactstrap';
import Game from "./model/Game";

function ModalBeginGame({ gameBegin }) {

    let [modalOpen, setModalOpen] = useState(!gameBegin);
    let list_Team = null;

    useEffect(() => { // On Open Admin 
        setModalOpen(!gameBegin);
    }, [gameBegin]);

    let closeModal = () => {
        setModalOpen(false);
    }
    Game.getInstance() && console.log(Game.getInstance().Regions);
    if (Game.getInstance() && Object.keys(Game.getInstance()).length > 0 && Object.keys(Game.getInstance().Players).length > 0 && Object.keys(Game.getInstance().Teams).length > 0) {
        let listPlayers = Game.getInstance().Players;
        let listTeams = Game.getInstance().Teams;
        list_Team = Object.keys(listTeams).map(function (keyT, index) // List Teams
        {
            let team = listTeams[keyT];
            let listPlayersInTeam = Object.keys(listPlayers).map(function (keyP, index) // List Players in current Team
            {
                let player = listPlayers[keyP];
                if (player.Team == team)
                    return <tr key={player.id}>
                        <td className="text-center">{player.name}</td>
                    </tr>;

            });
            return <tr key={team.id}>
                <td>{team.Name}</td>
                <td>{listPlayersInTeam}</td>
            </tr>;

        });

    }
    return (
        <>
            <Modal isOpen={modalOpen}>
                <ModalHeader className="text-center text-light bg-dark" >The Game wasn't begin</ModalHeader>
                <ModalBody className="text-center font-weight-bold">
                    {list_Team ? <Table className="text-center">
                        <thead>
                            <tr>
                                <th>Team Name</th>
                                <th>Players</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list_Team}
                        </tbody>
                    </Table> : <span>No Team</span>}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={closeModal} color="dark">Edit Map</Button>
                </ModalFooter>
            </Modal>
        </>
    );

}
export default ModalBeginGame;



