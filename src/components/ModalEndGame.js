import React from "react";
import {Modal,ModalHeader,ModalBody,ModalFooter,Button} from 'reactstrap';

function ModalEndGame({gameEnded,openConfig}) {
    
  return (
    <>  
        <Modal isOpen={gameEnded}>
            <ModalHeader className="text-center text-light bg-dark">The Game is closed</ModalHeader>
            <ModalBody className="text-center font-weight-bold">
                    Sorry but the game is end.
                    Do you want to open a new game ?
            </ModalBody>
            <ModalFooter>
                <Button onClick={openConfig} color="dark">YES</Button>
            </ModalFooter>
        </Modal>
    </>
  );

}
export default ModalEndGame;



