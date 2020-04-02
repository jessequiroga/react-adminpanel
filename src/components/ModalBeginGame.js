import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Container, Row } from 'reactstrap';
import PlayersListDisplay from "./PlayersListDisplay";
import Game from "../model/Game";

function ModalBeginGame({ gameBegin }) {

    let [modalOpen, setModalOpen] = useState(!gameBegin);
    let [listPlayer, setListPlayer] = useState(null);

    useEffect(() => { // On Open Admin 
        setModalOpen(!gameBegin);
    }, [gameBegin]);

    let closeModal = () => {
        setModalOpen(false);
    }

    return (
        <>
            <Modal isOpen={modalOpen}>
                <ModalHeader className="text-center text-light bg-dark" >The Game wasn't begin</ModalHeader>
                <ModalBody className="text-center font-weight-bold">

                    <PlayersListDisplay />

                </ModalBody>
                <ModalFooter>
                    <Button onClick={closeModal} color="dark">Edit Map</Button>
                </ModalFooter>
            </Modal>
        </>
    );

}
export default ModalBeginGame;



