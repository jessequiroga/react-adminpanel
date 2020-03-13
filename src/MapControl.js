import React,{ Component } from 'react';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import ManagerItems from './model/elements/Item';
import ManagerAltars from './model/elements/Altar';
import ManagerZones from './model/Zone';
import DrawConflict from './helper/DrawConflict.js';

import * as game from "./data/map.json";

export default class MapControl extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  visionCircleDragChange= (marker) =>
  {   
    let visionCircle = new window.google.maps.Circle({
      strokeColor: '#01A9DB',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#01A9DB',
      fillOpacity: 0.35,
      center: marker.position,
      radius: marker.visionCircle.radius
    });
    var listVisionMarkerWithoutCurrent= this.props.listVisionMarker.filter( (fmarker) => fmarker !== marker);
    var conflict= DrawConflict.isConflict(listVisionMarkerWithoutCurrent,visionCircle);
    var isInRegion = DrawConflict.isInRegion(this.props.listZone,marker);
    if(!conflict && isInRegion)
    {
      marker.visionCircle.setMap(null);
      marker.visionCircle=visionCircle;
      marker.visionCircle.setMap(this.map);
    }
  }

  markerDragStop = (marker) => {
    if(marker.position !== marker.visionCircle.center)
    {
      marker.position= marker.visionCircle.center;
      marker.setMap(null);
      marker.setMap(this.map);
    }
  }


  initConfigMap = () => {
    (Object.keys(game.default).length > 0) && (Object.keys(game.default.Flags).length > 0) && game.default.Flags.map(altar => { // For each altar on the configuration file Json
      var visionCircle = new window.google.maps.Circle({
        strokeColor: '#01A9DB',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#01A9DB',
        fillOpacity: 0.35,
        center: {lat:altar.Position[0],lng:altar.Position[1]},
        radius: altar.VisionDistance
      });
      let marker =  new window.google.maps.Marker({
        position: {lat:altar.Position[0],lng:altar.Position[1]},
        icon:ManagerAltars.getIcon(),
        type:'altar',
        id: altar.Id,
        visionCircle:visionCircle
      });
      marker.setMap(this.map);
      visionCircle.setMap(this.map);
      window.google.maps.event.addListener(marker, 'click',()=>!this.props.canDraw() && this.props.setSelectedDrawed(marker));
      window.google.maps.event.addListener(marker, "position_changed",()=>this.visionCircleDragChange(marker));
      window.google.maps.event.addListener(marker, "dragend",()=>this.markerDragStop(marker));
      this.props.listVisionMarker.push(marker);
      ManagerAltars.IncrId++;
    });

    (Object.keys(game.default).length > 0) && (Object.keys(game.default.Items).length > 0) && game.default.Items.map(item => { // For each altar on the configuration file Json
      var icon = ManagerItems.getIcon(item.Type);
      var visionCircle = new window.google.maps.Circle({
        strokeColor: '#01A9DB',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#01A9DB',
        fillOpacity: 0.35,
        center: {lat:item.Position[0],lng:item.Position[1]},
        radius: item.VisionDistance
      });
      let marker =  new window.google.maps.Marker({
        position: {lat:item.Position[0],lng:item.Position[1]},
        icon: icon,
        type:'item',
        id: item.Id,
        visionCircle:visionCircle
      }); 
      marker.setMap(this.map);
      visionCircle.setMap(this.map);
      window.google.maps.event.addListener(marker, 'click',()=>!this.props.canDraw() && this.props.setSelectedDrawed(marker));
      window.google.maps.event.addListener(marker, "position_changed",()=>this.visionCircleDragChange(marker));
      window.google.maps.event.addListener(marker, "dragend",()=>this.markerDragStop(marker));
      this.props.listVisionMarker.push(marker);
      ManagerItems.IncrId++;
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
      ManagerZones.IncrId++;
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