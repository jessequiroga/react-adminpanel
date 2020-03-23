import React,{ Component } from 'react';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import ManagerPlayers from './model/elements/Player';
import Game from './model/Game';

export default class PlayerControl extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  markerPlayers = (players) =>
  {
    players.forEach((player)=>{

      if(player.Id != null)
      {
        let indexP = Game.getInstance().findPlayerById(player.Id)
        if( indexP != -1)
            Game.getInstance().removePlayer(Game.getInstance().Players[indexP]);

        let newPlayer = ManagerPlayers.createPlayer(player.Position,player.Team,player.VisibleEntities,player.InventorySize,player.IsAFK,player.Items);
        let marker = newPlayer.toMapElement(this.map,this.props.canDraw,this.props.setSelectedDrawed);
        Game.getInstance().addPlayer(marker);
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
    if(this.props.listPlayer.length>0 && (this.listPlayer.length ==0 || this.listPlayer !== this.props.listPlayer)){
      this.markerPlayers(this.props.listPlayer);
      this.listPlayer = this.props.listPlayer;
    }
  }

  render()
  {
    return <div></div>
  }

}