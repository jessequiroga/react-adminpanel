import React,{ Component } from 'react';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';

import ManagerPlayers from '../model/elements/Player';
import Game from '../model/Game';
import Entity from '../model/elements/Entity';

export default class PlayerControl extends Component { //Controller des joueur, place les joueur sur la carte et les met à jour

  static contextTypes = { [MAP]: PropTypes.object }

  newMarkerPlayers = (players) => //affichage des joueur: reception de la liste des joueuer envoyer par le server et regarde si les joueur doivent etre rajouter ou mis à jour
  {
    players.forEach((player)=>{
      if(player != null &&  player.Id != null && (player.Team != null && typeof player.Team != "undefined"))
      {
        if(player.Position != null)
        {
          let indexP = Game.getInstance().findPlayerById(player.Id);
          if( indexP !== -1) // le joueur existe => on ne recrée pas un nouveau marker sur la carte
          {
            let _currentPlayer = Game.getInstance().Players[indexP];
            if( _currentPlayer.toMapElement &&  _currentPlayer.toMapElement() !== null)
            {
              _currentPlayer.Position = player.Position;
              _currentPlayer.toMapElement().setPosition({lat:player.Position[0],lng:player.Position[1]});
              if(_currentPlayer.toMapElement().visionCircle)
                _currentPlayer.toMapElement().visionCircle.setCenter({lat:player.Position[0],lng:player.Position[1]});

              /*if(player.IsAFK)
              {
                _currentPlayer.toMapElement().setMap(null);
                if(_currentPlayer.toMapElement().visionCircle)
                  _currentPlayer.toMapElement().visionCircle.setMap(null);
              }
              else if(_currentPlayer.toMapElement().map ===null){
                _currentPlayer.toMapElement().setMap(this.map);
                if(_currentPlayer.toMapElement().visionCircle)
                  _currentPlayer.toMapElement().visionCircle.setMap(this.map);
              }*/
              let newPlayer = ManagerPlayers.createPlayer(player.Position,player.ActionDistance,player.IsInActionRange,player.Name,player.VisionDistance,player.Team,player.VisibleEntities,player.InventorySize,player.IsAFK,player.Items,player.AffectedByItems,player.Id);
              newPlayer.MapEntity = _currentPlayer.toMapElement();
              Game.getInstance().replacePlayer(indexP,newPlayer);
              this.props.setInstanceListPlayer(Game.getInstance().Players);
            }
            else // le joueur n'existe pas encore => on crée le marker et on le dispose sur la carte
            {
              let newPlayer = ManagerPlayers.createPlayer(player.Position,player.ActionDistance,player.IsInActionRange,player.Name,player.VisionDistance,player.Team,player.VisibleEntities,player.InventorySize,player.IsAFK,player.Items,player.AffectedByItems,player.Id);
              newPlayer.toMapElement(this.map,this.props.setSelectedDrawed);
              /*if(player.IsAFK)
              {
                newPlayer.toMapElement().setMap(null);
                if(newPlayer.toMapElement().visionCircle)
                  newPlayer.toMapElement().visionCircle.setMap(null);
              }*/
              Game.getInstance().replacePlayer(indexP,newPlayer);
              this.props.setInstanceListPlayer(Game.getInstance().Players);
            }
          }
          else //si l'element n'a pas d'id on le recrée forcement un nouveau
          {
            let newPlayer = ManagerPlayers.createPlayer(player.Position,player.ActionDistance,player.IsInActionRange,player.Name,player.VisionDistance,player.Team,player.VisibleEntities,player.InventorySize,player.IsAFK,player.Items,player.AffectedByItems,player.Id);
            newPlayer.toMapElement(this.map,this.props.setSelectedDrawed);
            /*if(player.IsAFK)
            {
              newPlayer.toMapElement().setMap(null);
              newPlayer.toMapElement().visionCircle.setMap(null);
            }*/
            Game.getInstance().addPlayer(newPlayer);
            this.props.setInstanceListPlayer(Game.getInstance().Players);
            if(Entity.IncrId<player.Id)
                Entity.IncrId = player.Id+1;
            else
                Entity.IncrId ++;

          } 
        }         
      }
    });
  }


  newPlayerInLobby = (players) => //affichage des joueur traitement pour un affichage juste dans le lobby (la partie n'a pas encore commencée)
  {
    players.forEach((player)=>{
      if(player !=null && player.Id != null && (player.Team != null && typeof player.Team != "undefined") )
      {
        if(player.Position === null || typeof player.Position === "undefined")
        {
          let exist = false;
          let indexP = Game.getInstance().findPlayerById(player.Id);
          if( indexP !== -1)
          {
            exist = true;
          }

          let newPlayer = ManagerPlayers.createPlayer(player.Position,player.ActionDistance,player.IsInActionRange,player.Name,player.VisionDistance,player.Team,player.VisibleEntities,player.InventorySize,player.IsAFK,player.Items,player.AffectedByItems,player.Id);
          if(exist)
          {
            Game.getInstance().replacePlayer(indexP,newPlayer);
            this.props.setInstanceListPlayer(Game.getInstance().Players);
          }
          else
          {
            Game.getInstance().addPlayer(newPlayer);
            if(Entity.IncrId<player.Id)
                Entity.IncrId = player.Id+1;
            else
              Entity.IncrId ++;
            this.props.setInstanceListPlayer(Game.getInstance().Players);
          }
        }
      }
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
      //this.newPlayerInLobby(this.props.listPlayer);
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