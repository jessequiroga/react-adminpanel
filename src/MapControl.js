import React,{ Component } from 'react';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';

import * as game from "./data/map.json";

export default class MapControl extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  initConfigMap = () => {
    (Object.keys(game.default).length > 0) && (Object.keys(game.default.Altars).length > 0) && game.default.Altars.map(altar => { // For each altar on the configuration file Json
      let marker =  new window.google.maps.Marker({
        position: altar.Position,
        icon:altar.Icon,
        type:'altar',
        id: altar.Id
      });
      marker.setMap(this.map);
      window.google.maps.event.addListener(marker, 'click',()=>this.props.setSelectedDrawed(marker));
    });

    (Object.keys(game.default).length > 0) && (Object.keys(game.default.Items).length > 0) && game.default.Items.map(item => { // For each altar on the configuration file Json
      let marker =  new window.google.maps.Marker({
        position: item.Position,
        icon: item.Icon,
        type:'item',
        id: item.Id
      });
      marker.setMap(this.map);
      window.google.maps.event.addListener(marker, 'click',()=>this.props.setSelectedDrawed(marker));
    });

    (Object.keys(game.default).length > 0) && (Object.keys(game.default.Items).length > 0) && game.default.Zones.map(zone => { // For each altar on the configuration file Json
      let poly =  new window.google.maps.Polygon({
        paths:zone.Coordinates, // Initiate the coordinates of the marker with the json altar.geometry.coordinates
        type:'zone',
        id: zone.Id
      });
      poly.setMap(this.map);
      window.google.maps.event.addListener(poly, 'click',()=>{this.props.setSelectedDrawed(poly)});
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