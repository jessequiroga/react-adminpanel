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
    var canBeDifferent = true;
    if(this.game == null || Object.keys(this.game).length <=0)
    {
      canBeDifferent = false;
    }
    
    (Object.keys(game).length > 0) && (Object.keys(game.Flags).length > 0) && ( canBeDifferent?(this.game.Flags != game.Flags):true) &&  game.Flags.map(altar => { // For each altar on the websocket message
      if(altar.Id != null)
      {
        var indexA = Game.getInstance().findAltarById(altar.id);
        if(indexA !== -1)
          Game.Flags[indexA].toMapElement().setMap(null);

        let newAltar = ManagerAltars.createAltar(altar.Position);
        var withVisionCircle=true;
        newAltar.toMapElement(this.map,this.props.setSelectedDrawed,withVisionCircle);
        Game.getInstance().addAltar(newAltar);
      }
      else
        console.log("erreur pas d'id pour l'altar:",altar);
    });

    (Object.keys(game).length > 0) && (Object.keys(game.Items).length > 0) && (canBeDifferent?(this.game.Items != game.Items):true) && game.Items.map(item => { // For each item on the websocket message
      if(item.Id != null)
      {
        var indexI = Game.getInstance().findItemById(item.id);
        if(indexI !== -1)
          Game.Items[indexI].toMapElement().setMap(null);

        let newItem = ManagerItems.createItem(item.Position,item.Type);
        var withVisionCircle=true;
        newItem.toMapElement(this.map,this.props.setSelectedDrawed,withVisionCircle);
        Game.getInstance().addItem(newItem);
      }
      else
        console.log("erreur pas d'id pour l'item:",item);
    });

    (Object.keys(game).length > 0) && (Object.keys(game.Regions).length > 0) && (canBeDifferent?(this.game.Regions != game.Regions):true) && game.Regions.map(zone => { // For each zone on the websocket message
      if(zone.Id != null)
      {
        var indexZ = Game.getInstance().findZoneById(zone.id);
        if(indexZ !== -1)
          Game.Regions[indexZ].toMapElement().setMap(null);

        let newZone = ManagerZones.createZone(zone.Coordinates);
        let poly = newZone.toMapElement();
        poly.setMap(this.map);
        window.google.maps.event.addListener(poly, 'click',()=>{!this.props.canDraw() && this.props.setSelectedDrawed(poly)});
        Game.getInstance().addZone(newZone);
      }
      else
        console.log("erreur pas d'id pour la zone:",zone);
    });
  }

  componentWillMount() {
    this.map = this.context[MAP];
    this.game = null;
  }

  componentDidUpdate() {
    var game = this.props.gameFromServeur;
    if(game != null && Object.keys(game).length >0)
    if(this.game == null || this.game != game)
    {
      this.initConfigMap(game);
      this.game = game;
    }
  }

  render()
  {
    return <div></div>
  }

}