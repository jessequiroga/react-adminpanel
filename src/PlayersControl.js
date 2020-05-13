import React,{ Component } from 'react';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import ManagerPlayers from './model/elements/Player';
import Game from './model/Game';
import Entity from './model/elements/Entity';

export default class PlayerControl extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  newMarkerPlayers = (players) =>
  {
    players.forEach((player)=>{
      if(player.Id != null && player.Position != null && player.Team != null)
      {
        let indexP = Game.getInstance().findPlayerById(player.Id);
        if( indexP != -1)
        {
          let _currentPlayer = Game.getInstance().Players[indexP];
          if( _currentPlayer.MapEntity &&  _currentPlayer.MapEntity !== null)
          {
            _currentPlayer.Position = player.Position;
            _currentPlayer.toMapElement().setPosition({lat:player.Position[0],lng:player.Position[1]});
            if(_currentPlayer.toMapElement().visionCircle)
              _currentPlayer.toMapElement().visionCircle.setCenter({lat:player.Position[0],lng:player.Position[1]});

            if(player.IsAFK)
            {
              _currentPlayer.toMapElement().setMap(null);
              if(_currentPlayer.toMapElement().visionCircle)
                _currentPlayer.toMapElement().visionCircle.setMap(null);
            }
            else{
              _currentPlayer.toMapElement().setMap(this.map);
              if(_currentPlayer.toMapElement().visionCircle)
                _currentPlayer.toMapElement().visionCircle.setMap(this.map);
            }
          }
          else
          {
            let newPlayer = ManagerPlayers.createPlayer(player.Position,player.ActionDistance,player.IsInActionRange,player.Name,player.VisionDistance,player.Team,player.VisibleEntities,player.InventorySize,player.IsAFK,player.Items,player.Id);
            newPlayer.toMapElement(this.map,this.props.canDraw,this.props.setSelectedDrawed);
            if(player.IsAFK)
            {
              newPlayer.toMapElement().setMap(null);
              if(newPlayer.toMapElement().visionCircle)
                newPlayer.toMapElement().visionCircle.setMap(null);
            }
            Game.getInstance().replacePlayer(indexP,newPlayer);
          }
        }
        else
        {
          let newPlayer = ManagerPlayers.createPlayer(player.Position,player.ActionDistance,player.IsInActionRange,player.Name,player.VisionDistance,player.Team,player.VisibleEntities,player.InventorySize,player.IsAFK,player.Items,player.Id);
          newPlayer.toMapElement(this.map,this.props.canDraw,this.props.setSelectedDrawed);
          if(player.IsAFK)
          {
            newPlayer.toMapElement().setMap(null);
            newPlayer.toMapElement().visionCircle.setMap(null);
          }
          Game.getInstance().addPlayer(newPlayer);
          Entity.IncrId++;
        }          
      }
      else
        console.error("Un id ou une equipe n'est pas indiqué pour le player: ", player);
    });
  }


  newPlayerInLobby = (players) =>
  {
    players.forEach((player)=>{
      if(player !=null && player.Id != null )
      {
        if(player.Position === null)
        {
          let exist = false;
          let indexP = Game.getInstance().findPlayerById(player.Id);
          if( indexP != -1)
          {
            exist = true;
          }

          let newPlayer = ManagerPlayers.createPlayer(player.Position,player.ActionDistance,player.IsInActionRange,player.Name,player.VisionDistance,player.Team,player.VisibleEntities,player.InventorySize,player.IsAFK,player.Items,player.Id);
          if(exist)
          {
            Game.getInstance().replacePlayer(indexP,newPlayer);
          }
          else
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

  componentWillMount() {
    this.map = this.context[MAP];
    this.listPlayer = [];    
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

    if(gameBegin && !gameEnded){
      this.newPlayerInLobby(this.props.listPlayer);
      this.newMarkerPlayers(this.props.listPlayerPos);
    }
    else if (!gameBegin)
    {
      this.newPlayerInLobby(this.props.listPlayer);
    }
  }

  render()
  {
    return <div></div>
  }

}