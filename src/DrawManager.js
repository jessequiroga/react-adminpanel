import { Component } from 'react';
import { createPortal } from 'react-dom';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import AltarManager from './model/elements/Altar.js';
import ItemManager from './model/elements/Item.js';
import Game from './model/Game.js';
import $ from 'jquery';
import DrawConflict from './helper/DrawConflict.js';

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
    if(!conflict)
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

  addAltar = (mousePos) => // event add Altar marker
  {
    var conflict = false;
    let newAltar = AltarManager.createAltar(mousePos);
    let marker = newAltar.toMapElement();
    let visionCircle =  marker.visionCircle;


    conflict =DrawConflict.isConflict(this.props.listVisionMarker,visionCircle);
    if(!conflict)
    {
      visionCircle.setMap(this.map);
      visionCircle.draggable_changed = this.visionCircleDragChange;
      marker.setMap(this.map);
      marker['type'] = 'altar';
      marker['id'] = newAltar.Id;
      window.google.maps.event.addListener(marker, 'click',()=>!this.props.canDraw()&&this.props.setSelectedDrawed(marker));
      window.google.maps.event.addListener(marker, "position_changed",()=>this.visionCircleDragChange(marker));
      window.google.maps.event.addListener(marker, "dragend",()=>this.markerDragStop(marker));
      Game.getInstance().addAltar(newAltar);
      this.props.listVisionMarker.push(marker);
    }
  }

  addItem = (mousePos) => // event add Item marker
  {
    
    var conflict = false;
    let newItem = ItemManager.createItem(mousePos,"MagazineDeCult");
    let marker = newItem.toMapElement();
    let visionCircle =  marker.visionCircle;

    conflict = DrawConflict.isConflict(this.props.listVisionMarker,visionCircle);    
    if(!conflict)
    {
      marker.setMap(this.map);
      visionCircle.setMap(this.map);
      //visionCircle.draggable_changed = this.visionCircleDragChange;
      marker['type'] = 'item';
      marker['id'] = newItem.Id;
      window.google.maps.event.addListener(marker, 'click',()=>!this.props.canDraw()&&this.props.setSelectedDrawed(marker));
      window.google.maps.event.addListener(marker, "position_changed",()=>this.visionCircleDragChange(marker));
      window.google.maps.event.addListener(marker, "dragend",()=>this.markerDragStop(marker));
      Game.getInstance().addItem(newItem);
      this.props.listVisionMarker.push(marker);
    }
  }

  componentWillMount() { // MapControll creation
    this.map = this.context[MAP]; // get the google map object
    this.divDrawManager = window.document.createElement('div'); // create a body div
    this.map.controls[this.props.position].push(this.divDrawManager); // put the body div on the map
  }

  componentDidUpdate() {
    if(!this.props.canDraw())
    {
        //delete the cursor option
        $('div.gm-style').find('div[style*="z-index: 2000000000;"]').remove();
        //window.google.maps.event.clearListeners(this.map, 'click'); // clear all action add Element on the map
        this.props.listZone.forEach(zone => { // foreach polygon zone
          window.google.maps.event.clearListeners(zone, 'click'); // clear all action add Element on zone
          if(zone.editable)
            window.google.maps.event.addListener(zone, 'click',()=>!this.props.canDraw()&&this.props.setSelectedEdited(zone));
          else
            window.google.maps.event.addListener(zone, 'click',()=>!this.props.canDraw()&&this.props.setSelectedDrawed(zone)); // clear all action add Element on zone
        });
    }
    else
    {
      this.props.listZone.forEach(zone => { // foreach polygon zone
        window.google.maps.event.clearListeners(zone, 'click'); // clear all action add Element on zone
      });
    }

    if(this.props.canDrawItem)
    { 
      //set the cursor style as cross
      $('div.gm-style').find('div[style*="z-index: 106;"]').append('<div style="z-index: 2000000000; cursor: url(&quot;https://maps.gstatic.com/mapfiles/crosshair.cur&quot;), default; touch-action: none; position: absolute; left: -1280px; top: -332px; width: 2560px; height: 664px;"></div>');
        //this.map.addListener('click',this.addItem); // add the action listener click add Altar on the map
        this.props.listZone.forEach(zone => { // foreach polygon zone
          window.google.maps.event.addListener(zone, 'click',(event)=>this.addItem([event.latLng.lat(),event.latLng.lng()])); // add the action listener click add Altar on zone
        });
    }
    else if(this.props.canDrawAltar)
    {
      //set the cursor style as cross
      $('div.gm-style').find('div[style*="z-index: 106;"]').append('<div style="z-index: 2000000000; cursor: url(&quot;https://maps.gstatic.com/mapfiles/crosshair.cur&quot;), default; touch-action: none; position: absolute; left: -1280px; top: -332px; width: 2560px; height: 664px;"></div>');
      //this.map.addListener('click',this.addAltar); // add the action listener click add Altar on the map
      this.props.listZone.forEach(zone => { // foreach polygon zone
        window.google.maps.event.addListener(zone,'click',(event)=>this.addAltar([event.latLng.lat(),event.latLng.lng()])); // add the action listener click add Altar on zone
      });
    }        
  }

  componentWillUnmount() { // MapControll destroyer
    this.map.controls[this.props.position].removeAt(this.divIndex); // remove the div body on the map
  }

  render() {
    return createPortal(this.props.children, this.divDrawManager);
  }
}