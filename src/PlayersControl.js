import React,{ Component } from 'react';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import ManagerPlayers from './model/elements/Player';
import Game from './model/Game';
import Entity from './model/elements/Entity';

export default class PlayerControl extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  newMarkerPlayers = (players,Initiate=false) =>
  {
    players.forEach((player)=>{
      let exist = false;
      if(player.Id != null && player.Position != null)
      {
        let indexP = Game.getInstance().findPlayerById(player.Id)
        console.log("Player",indexP,player.Id,player.Name)
        if( indexP != -1)
        {
          if(!Initiate)
            Game.getInstance().Players[indexP].toMapElement().setMap(null);
          exist = true;
        }

        let newPlayer = ManagerPlayers.createPlayer(player.Position,player.ActionDistance,player.IsInActionRange,player.Name,player.VisionDistance,player.Team,player.VisibleEntities,player.InventorySize,player.IsAFK,player.Items,player.Id);
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
            Entity.IncrId++;
          }
        }
          
      }
      else
        console.log("Un id n'est pas indiqué pour le player: ", player);
    });
  }


  newPlayerInLobby = (players) =>
  {
    players.forEach((player)=>{
      if(player.Id != null)
      {
        let exist = false;
        let indexP = Game.getInstance().findPlayerById(player.Id);
        if( indexP != -1)
        {
          exist = true;
        }

        let newPlayer = ManagerPlayers.createPlayer(player.Position,player.ActionDistance,player.IsInActionRange,player.Name,player.VisionDistance,player.Team,player.VisibleEntities,player.InventorySize,player.IsAFK,player.Items,player.Id);
        console.log(newPlayer);
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
      if((new Date()) > (new Date(this_game.EndDate)))
      {
        gameEnded=true;
      }
      else if((new Date(this_game.BeginDate)) > (new Date()))
      {
        gameBegin=false;
      }
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
        this.newMarkerPlayers(this.props.listPlayerPos);
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