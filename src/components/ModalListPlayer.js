import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import PlayersListDisplay from "./PlayersListDisplay";
import Game from "../model/Game";

function ModalListPlayer( {listPlayerOpen, setListPlayerOpen} ) {

    let [listPlayer,setListPlayer] = useState(null);

    let closeModal = () => {
        setListPlayerOpen(false);
    }

    return (
        <>
            <Modal isOpen={listPlayerOpen}>
                <ModalHeader className="text-center text-light bg-dark">Connected Players</ModalHeader>
                <ModalBody className="text-center">
                    <PlayersListDisplay/>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={closeModal} color="dark">Close</Button>
                </ModalFooter>
            </Modal>
        </>
    );

}
export default ModalListPlayer;



