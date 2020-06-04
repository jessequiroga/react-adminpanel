import React from "react";
import {Modal,ModalHeader,ModalBody,ModalFooter,Button} from 'reactstrap';

import Game from '../model/Game';
import SocketMessage from '../model/SocketMessage';
import SocketController from '../model/SocketController';

function ModalEndGame({gameEnded}) {
    
  const openConfig =() =>{
    let game = Game.getInstance();
    game.IsFinal = false;
    let jsonMessage = new SocketMessage(game,SocketMessage.TypeMessage.GAMESETUP);
    var conn = SocketController.getSocket();
    conn.send(jsonMessage.toJson());
  }

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



