import React,{ Component } from 'react';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import ManagerPlayers from './model/elements/Player';
import Game from './model/Game';

export default class PlayerControl extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  newMarkerPlayers = (players,Initiate=false) =>
  {
    players.forEach((player)=>{
      let exist = false;
      if(player.Id != null && player.Position != null)
      {
        let indexP = Game.getInstance().findPlayerById(player.Id)
        if( indexP != -1)
        {
          if(!Initiate)
            Game.getInstance().Players[indexP].toMapElement().setMap(null);
          exist = true;
        }

        let newPlayer = ManagerPlayers.createPlayer(player.Position,player.Team,player.VisibleEntities,player.InventorySize,player.IsAFK,player.Items);
        newPlayer.toMapElement(this.map,this.props.canDraw,this.props.setSelectedDrawed);

        if(exist)
        {
          Game.getInstance().replacePlayer(indexP,newPlayer);
        }
        else
        {
          if(!Initiate)
          {
            Game.getInstance().addPlayer(newPlayer);
          }
        }
          
      }
      else
        console.log("Un id n'est pas indiqué pour le player: ", player);
    });
  }


  newPlayerInLobby = (players) =>
  {
    console.log(players);
    players.forEach((player)=>{
      if(player.Id != null)
      {
        let exist = false;
        let indexP = Game.getInstance().findPlayerById(player.Id)
        if( indexP != -1)
        {
          exist = true;
        }

        let newPlayer = ManagerPlayers.createPlayer(player.Position,player.Team,player.VisibleEntities,player.InventorySize,player.IsAFK,player.Items);
        if(exist)
        {
          Game.getInstance().replacePlayer(indexP,newPlayer);
        }
        else
        {
          Game.getInstance().addPlayer(newPlayer);
        }
      }
      else
        console.log("Un id n'est pas indiqué pour le player: ", player);
    });
  }

  componentWillMount() {
    this.map = this.context[MAP];
    this.listPlayer = [];
    let gameBegin = true;
    let gameEnded = false;

    if(Game.getInstance() != null)
    {
      let this_game = Game.getInstance();
      console.log("gameEnded",(new Date()) > (new Date(this_game.EndDate)))
      console.log("gameBegin",(new Date(this_game.BeginDate)) > (new Date()))
      if((new Date()) > (new Date(this_game.EndDate)))
      {
        gameEnded=true;
      }
      else if((new Date(this_game.BeginDate)) > (new Date()))
      {
        gameBegin=false;
      }
      console.log(gameBegin,gameEnded);
      if(gameBegin && !gameEnded)
        this.newMarkerPlayers(Game.getInstance().Players.slice(0),true);
      
    }
    
  }

  componentDidUpdate() {
    let gameBegin = true;
    let gameEnded = false;

    if(Game.getInstance() != null)
    {
      let this_game = Game.getInstance();
      console.log("gameBegin",(new Date(this_game.BeginDate)) > (new Date()))
      if((new Date()) > (new Date(this_game.EndDate)))
      {
        gameEnded=true;
      }
      else if((new Date(this_game.BeginDate)) > (new Date()))
      {
        gameBegin=false;
      }
    }

    if(this.props.listPlayer.length>0 && (this.listPlayer.length ==0 || this.listPlayer !== this.props.listPlayer)){
      this.listPlayer = this.props.listPlayer;
      if(gameBegin && !gameEnded){
        this.newMarkerPlayers(this.props.listPlayer);
      }
      else if (!gameBegin)
      {
        this.newPlayerInLobby(this.props.listPlayer);
      }
    }
  }

  render()
  {
    return <div></div>
  }

}