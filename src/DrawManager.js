import { Component } from 'react';
import { createPortal } from 'react-dom';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import AltarManager from './model/elements/Altar.js';
import ItemManager from './model/elements/Item.js';
import Game from './model/Game.js';
import $ from 'jquery';

export default class MapControl extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  addAltar = (event) => // event add Altar marker
  {
    let newAltar = AltarManager.createAltar(event.latLng);
    let marker = newAltar.toMapElement();
    marker.setMap(this.map);
    marker['type'] = 'altar';
    marker['id'] = newAltar.Id;
    window.google.maps.event.addListener(marker, 'click',()=>this.props.setSelectedDrawed(marker));
    Game.getInstance().addAltar(newAltar);
  }

  addItem = (event) => // event add Item marker
  {
    let newItem = ItemManager.createItem(event.latLng,{url:`/skateboarding.svg`,scaledSize: new window.google.maps.Size(50, 50)});
    let marker = newItem.toMapElement();
    marker.setMap(this.map);
    marker['type'] = 'item';
    marker['id'] = newItem.Id;
    window.google.maps.event.addListener(marker, 'click',()=>this.props.setSelectedDrawed(marker));
    Game.getInstance().addItem(newItem);
  }

  componentWillMount() { // MapControll creation
    this.map = this.context[MAP]; // get the google map object
    this.divDrawManager = window.document.createElement('div'); // create a body div
    this.map.controls[this.props.position].push(this.divDrawManager); // put the body div on the map
  }

  componentDidUpdate() {
    if(this.props.canDrawItem || this.props.canDrawAltar || this.props.canDrawMapZone || !this.props.canDraw())
    {
        //delete the cursor option
        $('div.gm-style').find('div[style*="z-index: 2000000000;"]').remove();
        //window.google.maps.event.clearListeners(this.map, 'click'); // clear all action add Element on the map
        this.props.listZone.forEach(zone => { // foreach polygon zone
          window.google.maps.event.clearListeners(zone, 'click'); // clear all action add Element on zone
          if(zone.editable)
            window.google.maps.event.addListener(zone, 'click',()=>this.props.setSelectedEdited(zone));
          else
            window.google.maps.event.addListener(zone, 'click',()=>this.props.setSelectedDrawed(zone)); // clear all action add Element on zone
        });
        console.log(this.props.listZone,'refresh');
    }

    if(this.props.canDrawItem)
    { 
      //set the cursor style as cross
      $('div.gm-style').find('div[style*="z-index: 106;"]').append('<div style="z-index: 2000000000; cursor: url(&quot;https://maps.gstatic.com/mapfiles/crosshair.cur&quot;), default; touch-action: none; position: absolute; left: -1280px; top: -332px; width: 2560px; height: 664px;"></div>');
        //this.map.addListener('click',this.addItem); // add the action listener click add Altar on the map
        this.props.listZone.forEach(zone => { // foreach polygon zone
          window.google.maps.event.addListener(zone, 'click',this.addItem); // add the action listener click add Altar on zone
        });
    }
    else if(this.props.canDrawAltar)
    {
      //set the cursor style as cross
      $('div.gm-style').find('div[style*="z-index: 106;"]').append('<div style="z-index: 2000000000; cursor: url(&quot;https://maps.gstatic.com/mapfiles/crosshair.cur&quot;), default; touch-action: none; position: absolute; left: -1280px; top: -332px; width: 2560px; height: 664px;"></div>');
      //this.map.addListener('click',this.addAltar); // add the action listener click add Altar on the map
      this.props.listZone.forEach(zone => { // foreach polygon zone
        window.google.maps.event.addListener(zone,'click',this.addAltar); // add the action listener click add Altar on zone
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