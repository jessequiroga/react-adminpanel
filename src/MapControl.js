import React,{ Component } from 'react';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import ManagerItems from './model/elements/Item';
import ManagerAltars from './model/elements/Altar';
import ManagerZones from './model/Zone';
import DrawConflict from './helper/DrawConflict.js';
import ManagerPlayers from './model/elements/Player';

import * as game from "./data/map.json";
import { createPortal } from 'react-dom';

export default class MapControl extends Component {

  static contextTypes = { [MAP]: PropTypes.object }



  connectWebsocket = () =>
  {
    var that = this;
    var socket = new WebSocket("ws://cultwars.net:5000/ws");
    this.socket =socket;

    socket.onopen = function () {
        console.log("Connected.");
        socket.send('{"MaxItemVisionDistance":0,"GogglesViewDistance":0,"Name":"TheGame","Duration":1000,"BeginDate":"2020-03-19T11:51:05.0598101+01:00","MinPlayer":4,"IP":"192.168.1.12","Players":[{"Items":[{"Type":"CultMag","CanChangeVisionDistance":false,"Quantity":0,"AvailableDuration":0,"CanTeleport":false,"DeficiencyDuration":0,"Position":[0.0,0.0],"VisionDistance":10,"ActionDistance":9,"Name":"OUI","IsInActionRange":false}],"IsAFK":false,"InventorySize":2,"Team":null,"VisibleEntities":[],"IsInZone":false,"EntitiesInView":null,"Position":[48.52862258260694,7.738950470522221],"VisionDistance":10,"ActionDistance":8,"Name":"Numil","IsInActionRange":false},{"Items":[],"IsAFK":false,"InventorySize":0,"Team":null,"VisibleEntities":[],"IsInZone":false,"EntitiesInView":null,"Position":[48.528636792858585,7.736761787966069],"VisionDistance":5,"ActionDistance":3,"Name":"Flo","IsInActionRange":false}],"Regions":[{"Coordinates":[[10.0,10.0],[20.0,20.0],[35.0,35.0]],"Forbidden":false}],"Items":[{"Type":"CultMag","CanChangeVisionDistance":false,"Quantity":0,"AvailableDuration":0,"CanTeleport":false,"DeficiencyDuration":0,"Position":[0.0,0.0],"VisionDistance":10,"ActionDistance":9,"Name":"OUI","IsInActionRange":false}],"Teams":[{"Name":"TheTeam","Color":"RED","Markers":null}],"Flags":[{"Team":null,"UnavailableTime":0,"CaptureDate":"0001-01-01T00:00:00","Position":[0.0,0.0],"VisionDistance":10,"ActionDistance":5,"Name":"TheFlash","IsInActionRange":false}]}');
    }

    socket.onclose = function (event) {
        if (event.wasClean) {
            console.log('Disconnected.');
        } else {
            console.log('Connection lost.'); // for example if server processes is killed
        }
        console.log('Code: ' + event.code + '. Reason: ' + event.reason);
    };

    socket.onmessage = function (event) {
        console.log("Data received: " + event.data);
        var json_Object = JSON.parse(event.data);
        if(Object.keys(json_Object).indexOf("Players") && json_Object.Players.length >0)
          that.createPlayers(json_Object.Players);
    };

    socket.onerror = function (error) {
        console.log("Error: " + error.message);
    };

    console.log();
    
  }

  createPlayers = (players) =>
  {
    console.log(players);
    players.forEach((player)=>{
      console.log(player);
      let marker =  new window.google.maps.Marker({
        position: {lat:player.Position[0],lng:player.Position[1]},
        icon: ManagerPlayers.getIcon(),
        type:'player',
        id: ManagerPlayers.IncrId,
      }); 
      marker.setMap(this.map);
      ManagerPlayers.IncrId++;
    });
  }

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
        id: ManagerAltars.IncrId,
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
        id: ManagerItems.IncrId,
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
        id: ManagerZones.IncrId,
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
    this.connectWebsocket();
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