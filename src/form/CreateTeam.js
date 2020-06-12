import React,{useState, useEffect} from 'react';
import {Button,Table} from 'reactstrap';

import TextDisplay from '../components/TextDisplay';
import $ from 'jquery';

const CreateTeam = ({currTeams,formular,changeFormular}) =>
{
    const [incrTeam,changeIncrTeam] = useState([]);
    const [teams,changeTeams] = useState([]);
  
    const onChange =(event) =>
    {
        let sel = $(event.target);
        let color = $("option:selected", sel).val();
        sel.css("background-color", color);
        formular[sel[0].name].color= color;
    }

    const refreshTeam = () =>
    {
        changeTeams(incrTeam.map(function (key,index)
        {
            let name = "Name";
            let color = null;
            if(typeof incrTeam[index]  == 'object')
            {
                name = incrTeam[index].Name;
                color = incrTeam[index].Color;
            }
            index = index+1;
            return  <tr key={index}>
                        <td>
                            <TextDisplay name={"teamname"+index} typeInput="tag" placeHolder={name} label={"Team " + index } formular={formular} changeFormular={changeFormular}/>
                        </td>
                        <td>
                            <select style={{height:"38px",width:"80px",backgroundColor:color}} name={"teamname"+index} onChange={onChange} className={"teamColor "+index}>
                                <option></option>
                                <option style={{backgroundColor:"green"}} defaultValue={color==="green"} className="green" value="green"></option>
                                <option style={{backgroundColor:"purple"}} defaultValue={color==="purple"} className="purple" value="purple"></option>
                                <option style={{backgroundColor:"red"}}  defaultValue={color==="red"}className="red" value="red"></option>
                                <option style={{backgroundColor:"yellow"}} defaultValue={color==="yellow"} className="yellow" value="yellow"></option>
                            </select>
                        </td>
                    </tr>
        }));    
    }

    const Addteam= (currTeam=null) =>
    {
        incrTeam.push(currTeam?currTeam:1);
        changeIncrTeam(incrTeam);
        formular["teamname"+incrTeam.length] = {value: '',errorMessage :'',message:'',isValid : currTeam?true:false,color:'',Id:currTeam?currTeam.Id:null}
        changeFormular(formular);
        refreshTeam();
    }

    const RemoveTeam=() =>
    {
        delete formular["teamname"+(incrTeam.length)]
        incrTeam.pop();
        changeIncrTeam(incrTeam);
        refreshTeam();
    }

    const ClearTeams=() =>
    {
        let  numberDel =  incrTeam.length;
        for (let i=0;i<numberDel;i++)
        {
            RemoveTeam();
        }
    }

    useEffect(() =>
    {
        if(typeof currTeams !== "undefined" && currTeams !== null)
        {
            ClearTeams();
            currTeams.map(function(key,index)
            {
                let currTeam = currTeams[index];
                Addteam(currTeam);
                return true;
            });
        }
        else
        {
            Addteam();
            Addteam();
        }
    },[currTeams]);

    return (
        <>
        <Button className="ml-1 mb-2 fixed-right" color="myblue" onClick={Addteam}>Add Team</Button>
        <Button className="ml-1 mb-2 fixed-right" color="myblue" onClick={RemoveTeam}>Remove A Team</Button>
        <Table>
            <thead>
                <tr>
                    <th>Team Name</th>
                    <th>Color</th>
                </tr>
            </thead>
            <tbody>
                {teams}
            </tbody>
        </Table>
        </>

  );
}

export default CreateTeam;
