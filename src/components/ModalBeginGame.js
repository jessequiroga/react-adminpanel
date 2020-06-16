import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row } from 'reactstrap';

import Game from "../model/Game";

import PlayersListDisplay from "./PlayersListDisplay";
import Time from "../helper/Time";

function ModalBeginGame({gameBegin,beginDate}) {

    const [modalOpen, setModalOpen] = useState(!gameBegin);
    const [untilBegin,setUntilBegin] = useState(null);
    const [instanceListPlayer,setInstanceListPlayer] = useState({});
    const [tickRate,setTickRate] = useState(null);

    useEffect(() => { // On Open Admin 
        setModalOpen(!gameBegin);
    }, [gameBegin]);

    useEffect(()=>{
        if(modalOpen)
        {
            const id = setInterval(() => {
                Game.getInstance()&&setInstanceListPlayer(Game.getInstance().Players);
                let timediff = Time.diffTime(new Date (beginDate),new Date())
                setUntilBegin(timediff);
                console.log("timediff",timediff)
                if(parseInt(timediff.split(":")[2])<0)
                {
                    closeModal();
                }
                }, 1000);
            setTickRate(id);
            return () => clearInterval(id); // this "clean" function is executed here on component unmount
        }
    },[modalOpen]);

    let closeModal = () => {
        clearInterval(tickRate);
        setModalOpen(false);
    }

    return (
        <Modal isOpen={modalOpen}>
            <ModalHeader  className="bg-dark" >
                <Row className="text-center text-light">
                    <div>The Game didn't start yet</div>
                    <div>It will start the: {(new Date(beginDate)).toDateString()}</div>
                </Row>
            </ModalHeader>
            <ModalBody className="text-center font-weight-bold">
                <div>The game begin in: {untilBegin}</div>
                <PlayersListDisplay instanceListPlayer={instanceListPlayer} />

            </ModalBody>
            <ModalFooter>
                <Button onClick={closeModal} color="dark">Edit Map</Button>
            </ModalFooter>
        </Modal>
    );

}
export default ModalBeginGame;



