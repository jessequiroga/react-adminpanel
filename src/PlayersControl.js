import React,{ Component } from 'react';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import ManagerPlayers from './model/elements/Player';

export default class PlayerControl extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  markerPlayers = (players) =>
  {
    players.forEach((player)=>{
      let newPlayer = ManagerPlayers.createPlayer(player.Position,player.Team,player.VisibleEntities,player.InventorySize,player.IsAFK,player.Items);
      newPlayer.toMapElement(this.map,this.props.canDraw,this.props.setSelectedDrawed);
    });
  }

  componentWillMount() {
    this.map = this.context[MAP];
  }

  componentDidUpdate() {
    this.markerPlayers(this.props.listPlayer);
  }

  render()
  {
    return <div></div>
  }

}