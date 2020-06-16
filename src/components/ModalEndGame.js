import React,{useEffect, useState} from "react";
import {Modal,ModalHeader,ModalBody,Button,Table} from 'reactstrap';

function ModalEndGame({gameEnded,openUpload,winners}) {

  const [listWinners,setListWinners] = useState(null);

  useEffect(() => { 
    if(winners != null)
    {
      let ranking = Object.keys(winners).map(index => {
        return  <tr key={index}>
                  <td>
                    {parseInt(index)+1}
                  </td>
                  <td style={{color:winners[index].Color}}>
                    {winners[index].Name}
                  </td>
                </tr>
      });

      setListWinners(ranking);

    }
  },[winners]);
    
return (
    <Modal isOpen={gameEnded}>
        <ModalHeader className="text-center text-light bg-dark">The Game has ended</ModalHeader>
        <ModalBody className="text-center font-weight-bold">
        {listWinners?
                <Table>
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Team Name</th>
                    </tr>
                    </thead>
                    <tbody>
                      {listWinners}
                    </tbody>
                </Table>
                :<div>Sorry but the game is end.</div>}
        </ModalBody>
        <div className="text-center mb-2">
          Want more ?
          <Button style={{marginLeft:"10px"}} onClick={openUpload} color="dark">Open a New Map</Button>
        </div>
    </Modal>
  );

}
export default ModalEndGame;



