import React,{useState,useEffect} from "react";
import {Card,CardBody,CardHeader,Col,Alert,Form,Row,Button} from 'reactstrap';

import Time from '../helper/Time';

import SocketMessage from '../model/SocketMessage';
import TeamManager from '../model/Team';
import SocketController from '../model/SocketController';
import Game from '../model/Game';

import TextDisplay from '../components/TextDisplay';
import SelectDisplay from '../components/SelectDisplay';

import DateTimeDisplay from '../components/DateTimeDisplay';
import CreateTeam from './CreateTeam';

import 'react-widgets/dist/css/react-widgets.css';

function MapConfigPannel({Config,setConfig}) {

  const [currTeams,changeCurrTeams]    = useState(null); 
  const [error,changeError] = useState(''); // On stocke les erreur eventuelles
  const [formular,changeFormular] = useState( // Definition du formulaire
      {
          nameChang : {value: '',errorMessage:'',message:'',isValid: true}, // champ nom de la colocation
          typeGameChang : {value:'', errorMessage: '',message:'',isValid: true},
          beginDate : {value:'', errorMessage: 'This is a needed filed',message:'',isValid: false},
          endDate : {value:'', errorMessage: 'This is a needed filed',message:'',isValid: true},
          isPublic: {value:false, isValid:true}
      }
  );

  const changeRefresh = useState(null);

  Config.Type =parseInt(Config.Type);
  useEffect(()=>{
    changeCurrTeams(Config?Config.Teams:null);
    if(Config && parseInt(Config.Type) === Game.GameType.SUPREMACY)
    {
        formular.endDate.isValid = true;
    }
    else
    {
        formular.endDate.isValid = false;
    }
    changeFormular(formular);
  },[Config]);

    const onChangeTypeGame = (event) =>
    {
        let val = event.target.value;
        if((event.target.value === Game.GameType.TIME) || (event.target.value === Game.GameType.FLAG))
        {
            formular.endDate.isValid = false;
        }
        else
        {
            formular.endDate.isValid = true;
        }
        changeRefresh[1](val); // Refresh the display
    }

    const changPublic = (event) =>
    {
        let val = event.target.checked;
        formular.isPublic.value= val;
        formular.isPublic.isValid= true;
        changeFormular(formular);
        changeRefresh[1](val);
    }

    const findTeam = (id) =>
    {
        var team = false;

        var indexT = currTeams.findIndex( ({ Id }) => Id === id);
        if(indexT!==-1)
        {
            team = currTeams[indexT];
        }
        changeCurrTeams(currTeams);
        return team;
    }

    const replaceTeam = (id,team) =>
    {
        console.log(currTeams)
        var indexT = currTeams.findIndex( ({ Id }) => Id === id);
        if(indexT!==-1)
        {
            currTeams[indexT] = team;
        }
        changeCurrTeams(currTeams);
        return currTeams;
    }

    const addTeam = (color,name) =>
    {
        console.log(currTeams);
        currTeams.push(TeamManager.create(color,name))
        changeCurrTeams(currTeams);
        
        return currTeams;
    }

  const onSubmit = (e) =>
  {
    e.preventDefault(); // On bloque l'envoi par défault du formulaire

    let formulaireValide = true; // Le formulaire est valide

    let Teams =[];
    let content = {};
    Object.keys(formular).map(x =>{
        if(x.indexOf("teamname")!==-1 && x.indexOf("Color") === -1 ){
            if ((formular[x+"Color"].value !== "" && formular[x+"Color"].value !== null) || (formular[x].value !== null && formular[x].value !== "") )  {
                if(formular[x].Id!==null && typeof formular[x].Id!=="undefined")
                { 
                    let team  = findTeam(parseInt(formular[x].Id));
                    if(formular[x+"Color"].value!==null && typeof formular[x+"Color"].value!=="undefined" && formular[x+"Color"].value!=="")team.Color = formular[x+"Color"].value;
                    if(formular[x].value!==null && typeof formular[x].value!=="undefined" && formular[x].value!=="")team.Name = formular[x].value;                       
                    Teams = replaceTeam(parseInt(formular[x].Id),team);
                }
                else
                {
                    Teams = addTeam(formular[x+"Color"].value,formular[x].value);
                }
            }
        }
        if(x.indexOf("Chang")!==-1)
        {
            if(formular[x].value !== null && formular[x].value !== "")
            {
                if(x.indexOf("teamname")===-1)
                {
                    content[x] = formular[x].value;
                }
            }
        }
        else if( x.indexOf("teamname")===-1)
        {
            content[x] = formular[x].value;
            if(!formular[x].isValid) // Si un champs n'est pas valide alors tout le formulaire ne l'est pas
                formulaireValide = false; // Le formulaire n'est pas valide
        }
        return true;
    });

    
    if(!formulaireValide)// Si le formulaie n'est pas valid on previent l'uttilisateur
    {
        changeError("The formular isn't valide !"); // On stocke l'erreur
    }
    else
    {

        if(content.typeGameChang!=null){Config.Type = content.typeGameChang;}
        if(content.nameChang){Config.Name =content.nameChang;}
        if(Teams.length>0){Config.Teams = Teams;}
        
        Config.BeginDate = new Date(content.beginDate)
        if(Config.Type === Game.GameType.TIME || Config.Type === Game.GameType.FLAG)
        {
            Config.EndDate = new Date(content.endDate)
        }
        else
        {
            Config.EndDate = (new Date("01/17/2028"))
        }

        Config.IsFinal = true;
        Config.IsPublic = content.isPublic;

        if((Config.EndDate) < new Date())
        {
            formular.endDate.isValid = false;
            formular.endDate.errorMessage = "You can't end a game befor now";
            changeFormular(formular);
        }   
        else
        {       
            let jsonMessage = new SocketMessage(Config,SocketMessage.TypeMessage.GAMESETUP);
            var conn = SocketController.getSocket();
            setConfig(null);
            conn.send(jsonMessage.toJson());
        }
    }
  }

  return (
    <Col className="p-5" md={{ size: 6, offset: 4 }}>
      <Card className="mt-4">
            <CardHeader className="bg-dark text-center text-light">
                <h3 className="m-0">Update your Config</h3>
            </CardHeader>
            <CardBody className="bg-light">
            {error && <Alert color="danger" className={"text-center"}>
                {error}
            </Alert>}
            <Form onSubmit={onSubmit} className="containers" >
                <div style={{backgroundColor:"rgba(217, 218, 221, 0.48)",borderRadius: "0.25rem",marginBottom: "23px"}}>
                    <Row className="ml-2">
                        <h2>Info Game</h2>
                    </Row>
                    <Row form className="ml-1 pb-2">
                        <Col md={6}>
                            <TextDisplay name="nameChang" typeInput="tag" placeHolder={Config?Config.Name:""} label="Game Name" formular={formular} changeFormular={changeFormular}/>
                        </Col>
                        <Col md={6}>
                            <SelectDisplay style={{height:"38px", minWidth:"20px"}} name="typeGameChang" typeInput="Type" label="Type Game" formular={formular} changeFormular={changeFormular}  onChange={(e)=>{onChangeTypeGame(e);}}>
                                {
                                    Object.keys(Game.GameType).map(type=>{
                                        let nameType = type.toString();
                                        let Camel = nameType[0].toUpperCase() + nameType.slice(1,50).toLowerCase();
                                        return  <option key={type} selected={(Config)?Game.GameType[type]===parseInt(Config.Type):false} value={Game.GameType[type]}>{Camel}</option>
                                    })
                                }
                            </SelectDisplay>
                        </Col>
                    </Row>
                    <Row form className="ml-1 pb-2">
                            <Col md={6}>
                                <DateTimeDisplay name="beginDate" twinsName="endDate" typeInput="dateBegin" label="Begin Date" placeHolder={new Date()} formular={formular} changeFormular={changeFormular}/>
                            </Col>
                    </Row>
                    {((Config && formular.typeGameChang.value === "" && (parseInt(Config.Type) === Game.GameType.TIME || parseInt(Config.Type) === Game.GameType.FLAG )) || (formular.typeGameChang.value !== "" && (parseInt(formular.typeGameChang.value) === Game.GameType.TIME || parseInt(formular.typeGameChang.value) === Game.GameType.FLAG)))?
                    <Row form className="ml-1 pb-2">
                            <Col md={6}>
                                <DateTimeDisplay name="endDate" twinsName="beginDate" typeInput="dateEnd" label="End Date" placeHolder={ Time.addDays(new Date() , 1)} formular={formular} changeFormular={changeFormular} min={new Date()}/>
                            </Col>
                    </Row>:null}
                    <Row form className="ml-1 pb-2">
                        <span style={{marginLeft:"3%"}}>Is Public ?</span>
                        <input style={{marginLeft:"10px"}} type="checkbox" onChange={changPublic} color="dark"/>
                    </Row>
                </div>
                <div style={{backgroundColor:"rgba(217, 218, 221, 0.48)",borderRadius: "0.25rem"}}>
                    <Row className="ml-2">
                        <h2>Teams</h2>
                    </Row>
                    <Row form className="ml-1 pb-2">
                            <CreateTeam currTeams={currTeams} formular={formular} changeFormular={changeFormular}/>
                    </Row>
                </div>
                <div className="pt-4 float-right">
                    <Button color="dark">update</Button>
                </div>
            </Form>
            </CardBody>
        </Card>
    </Col>
  );

}
export default MapConfigPannel;

