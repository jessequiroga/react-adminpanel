import React,{ Component } from 'react';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import ManagerItems from './model/elements/Item';
import ManagerAltars from './model/elements/Altar';
import ManagerZones from './model/Zone';
import Game from './model/Game.js';

export default class MapControl extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  initConfigMap = () => {
    if(Object.keys(Game.getInstance()).length >0)
    {
      let game = Game.getInstance();
      (Object.keys(game.Flags).length > 0) && game.Flags.map(altar => { // For each altar on the websocket message
        let exist =false;
        if(altar.Id != null)
        {
          var indexA = Game.getInstance().findAltarById(altar.Id);
          if(indexA !== -1)
          {
            //Game.getInstance().Flags[indexA].toMapElement().setMap(null);
            exist = true;
          }

          let newAltar = ManagerAltars.createAltar(altar.Position);
          var withVisionCircle=true;
          newAltar.toMapElement(this.map,this.props.setSelectedDrawed,withVisionCircle);
          if(exist)
            Game.getInstance().replaceAltar(indexA,newAltar);
        }
        else
          console.log("erreur pas d'id pour l'altar:",altar);
      });

      (Object.keys(game.Items).length > 0) && game.Items.map(item => { // For each item on the websocket message
        let exist =false;
        if(item.Id != null)
        {
          var indexI = Game.getInstance().findItemById(item.Id);
          if(indexI !== -1)
          {
            //Game.getInstance().Items[indexI].toMapElement().setMap(null);
            exist = true;
          }

          let newItem = ManagerItems.createItem(item.Position,item.Type);
          var withVisionCircle=true;
          newItem.toMapElement(this.map,this.props.setSelectedDrawed,withVisionCircle);
          if(exist)
            Game.getInstance().replaceItem(indexI,newItem);
        }
        else
          console.log("erreur pas d'id pour l'item:",item);
      });

      (Object.keys(game.Regions).length > 0) && game.Regions.map(zone => { // For each zone on the websocket message
        let exist =false;
        if(zone.Id != null)
        {
          var indexZ = Game.getInstance().findZoneById(zone.Id);
          if(indexZ !== -1)
          {
            //Game.getInstance().Regions[indexZ].toMapElement().setMap(null);
            exist=true;
          }

          let newZone = ManagerZones.createZone(zone.Coordinates);
          let poly = newZone.toMapElement(this.map);
          window.google.maps.event.addListener(poly, 'click',()=>{!this.props.canDraw() && this.props.setSelectedDrawed(poly)});
          if(exist)
            Game.getInstance().replaceRegion(indexZ,newZone);
        }
        else
          console.log("erreur pas d'id pour la zone:",zone);
      });
    }
  }

  componentWillMount() {
    this.map = this.context[MAP];
    this.initConfigMap();
  }

  componentDidUpdate() {
    return null;
  }

  render()
  {
    return <div></div>
  }

}