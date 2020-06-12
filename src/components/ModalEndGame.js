import React from "react";
import {Modal,ModalHeader,ModalBody,ModalFooter,Button} from 'reactstrap';

function ModalEndGame({gameEnded,openConfig,winer}) {
    
  return (
    <>  
        <Modal isOpen={gameEnded}>
            <ModalHeader className="text-center text-light bg-dark">The Game is closed</ModalHeader>
            <ModalBody className="text-center font-weight-bold">
                    <div>{winer?"The winer is: "+winer.Name:"Sorry but the game is end."}</div>
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



