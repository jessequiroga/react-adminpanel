import React,{ Component } from 'react';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import ManagerItems from './model/elements/Item';
import ManagerAltars from './model/elements/Altar';


import * as game from "./data/map.json";

export default class MapControl extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  initConfigMap = () => {
    (Object.keys(game.default).length > 0) && (Object.keys(game.default.Flags).length > 0) && game.default.Flags.map(altar => { // For each altar on the configuration file Json
      let marker =  new window.google.maps.Marker({
        position: {lat:altar.Position[0],lng:altar.Position[1]},
        icon:ManagerAltars.getIcon(),
        type:'altar',
        id: altar.Id
      });
      marker.setMap(this.map);
      window.google.maps.event.addListener(marker, 'click',()=>!this.props.canDraw() && this.props.setSelectedDrawed(marker));
    });

    (Object.keys(game.default).length > 0) && (Object.keys(game.default.Items).length > 0) && game.default.Items.map(item => { // For each altar on the configuration file Json
      var icon = ManagerItems.getIcon(item.Type);
      let marker =  new window.google.maps.Marker({
        position: {lat:item.Position[0],lng:item.Position[1]},
        icon: icon,
        type:'item',
        id: item.Id
      });
      marker.setMap(this.map);
      window.google.maps.event.addListener(marker, 'click',()=>!this.props.canDraw() && this.props.setSelectedDrawed(marker));
    });

    (Object.keys(game.default).length > 0) && (Object.keys(game.default.Regions).length > 0) && game.default.Regions.map(zone => { // For each altar on the configuration file Json
      var coordinates =[];
      zone.Coordinates.forEach(coordinate => {
        coordinates.push({lat:coordinate[0],lng:coordinate[1]});
      });
      let poly =  new window.google.maps.Polygon({
        paths:coordinates, // Initiate the coordinates of the marker with the json altar.geometry.coordinates
        type:'zone',
        id: zone.Id,
        strokeColor: "#FF0000",
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: "#FF0000",
        fillOpacity: 0.30,    
      });
      poly.setMap(this.map);
      window.google.maps.event.addListener(poly, 'click',()=>{!this.props.canDraw() && this.props.setSelectedDrawed(poly)});
      this.props.listZone.push(poly);
    });
  }

  componentWillMount() {
    this.map = this.context[MAP]
    this.initConfigMap();
  }

  shouldComponentUpdate() {
    return false;
  }

  render()
  {
    return <div></div>
  }

}