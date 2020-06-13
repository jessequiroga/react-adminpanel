import React from "react";
import {Modal,ModalHeader,ModalBody,ModalFooter,Button,Container,Row,Col} from 'reactstrap';

function ModalEndGame({gameEnded,openConfig,winners}) {

  const listWinners = null;
  if(winners != null)
  {
      listWinners = Object.keys(winners).map((team,index) => {
      return <Row>
                <Col>
                  {team.Name}
                </Col>
                <Col>
                  {index}
                </Col>
             </Row>
    });

  }
    
  return (
    <>  
        <Modal isOpen={gameEnded}>
            <ModalHeader className="text-center text-light bg-dark">The Game is closed</ModalHeader>
            <ModalBody className="text-center font-weight-bold">
                    <div>{listWinners?
                    <Container>
                        <Row>
                            <Col>
                              Team Name
                            </Col>
                            <Col>
                              Rank
                            </Col>
                        </Row>
                        {listWinners}
                    </Container>
                    :"Sorry but the game is end."}</div>
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



