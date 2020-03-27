import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import PlayersListDisplay from "./PlayersListDisplay";

function ModalListPlayer({ listPlayerOpen, setListPlayerOpen }) {

    let closeModal = () => {
        setListPlayerOpen(false);
    }
    return (
        <>
            <Modal isOpen={listPlayerOpen}>
                <ModalHeader className="text-center text-light bg-dark">Connected Players</ModalHeader>
                <ModalBody className="text-center font-weight-bold">
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



