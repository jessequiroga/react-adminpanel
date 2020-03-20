import React,{ Component } from 'react';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import ManagerPlayers from './model/elements/Player';

export default class PlayerControl extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  markerPlayers = (players) =>
  {
    for(const[playerMarker,index] in this.props.listMarkerPlayer){
      playerMarker.setMap(null);
      playerMarker.Id = null;
      this.props.listMarkerPlayer.slice(index,1);
    };
    players.forEach((player)=>{
      let newPlayer = ManagerPlayers.createPlayer(player.Position,player.Team,player.VisibleEntities,player.InventorySize,player.IsAFK,player.Items);
      let marker = newPlayer.toMapElement(this.map,this.props.canDraw,this.props.setSelectedDrawed);
      this.props.listMarkerPlayer.push(marker);
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