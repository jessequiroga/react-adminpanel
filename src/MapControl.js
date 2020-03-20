import React,{ Component } from 'react';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import ManagerItems from './model/elements/Item';
import ManagerAltars from './model/elements/Altar';
import ManagerZones from './model/Zone';
import Game from './model/Game.js';

export default class MapControl extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  initConfigMap = (game) => {
    (Object.keys(game).length > 0) && (Object.keys(game.Flags).length > 0) && game.Flags.map(altar => { // For each altar on the configuration file Json
      let newAltar = ManagerAltars.createAltar(altar.Position);
      var withVisionCircle=true;
      newAltar.toMapElement(this.map,this.props.canDraw,this.props.setSelectedDrawed,withVisionCircle,this.props.listZone);
      Game.getInstance().addAltar(newAltar);
    });

    (Object.keys(game).length > 0) && (Object.keys(game.Items).length > 0) && game.Items.map(item => { // For each altar on the configuration file Json
      let newItem = ManagerItems.createItem(item.Position,item.Type);
      var withVisionCircle=true;
      newItem.toMapElement(this.map,this.props.canDraw,this.props.setSelectedDrawed,withVisionCircle,this.props.listZone);
      Game.getInstance().addItem(newItem);
    });

    (Object.keys(game).length > 0) && (Object.keys(game.Regions).length > 0) && game.Regions.map(zone => { // For each altar on the configuration file Json
      var coordinates =[];
      zone.Coordinates.forEach(coordinate => {
        coordinates.push({lat:coordinate[0],lng:coordinate[1]});
      });
      let newZone = ManagerZones.createZone(coordinates);
      let poly = newZone.toMapElement();
      poly.setMap(this.map);
      window.google.maps.event.addListener(poly, 'click',()=>{!this.props.canDraw() && this.props.setSelectedDrawed(poly)});
      this.props.listZone.push(poly);
      Game.getInstance().addZone(newZone);
    });
  }

  componentWillMount() {
    this.map = this.context[MAP]
    this.game = null;
  }

  componentDidUpdate() {
    var game = this.props.gameFromServeur;
    if(Object.keys(game).length >0)
    if(this.game == null || this.game != game)
    {
      this.game = game;
      this.initConfigMap(game);
    }
  }

  render()
  {
    return <div></div>
  }

}