import { Component } from 'react';
import { createPortal } from 'react-dom';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import AltarManager from './model/elements/Altar.js';
import ItemManager from './model/elements/ItemManager';
import Game from './model/Game.js';
import $ from 'jquery';
import SocketController from './model/SocketController.js';
import SocketMessage from './model/SocketMessage.js';
import Entity from './model/elements/Entity.js';

export default class DrawManager extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  addAltar = (mousePos) => // event add Altar marker
  {
    let newAltar = AltarManager.createAltar(mousePos);
    var withColision = true;
    var withVisionCircle = true;
    let response = newAltar.toMapElement(this.map, this.props.setSelectedDrawed, withVisionCircle, withColision);
    if(response !== null)
    {
      Game.getInstance().addAltar(newAltar);
      let message = (new SocketMessage(newAltar, SocketMessage.TypeMessage.FLAGADD)).toJson();
      SocketController.getSocket().send(message);
    }
    else
    {
      Entity.IncrId--;
    }
  }

  addItem = (mousePos,type ="CultMag") => // event add Item marker
  {
    let newItem = ItemManager.createItem(mousePos, type);
    var withColision = true;
    var withVisionCircle = true;
    let response = newItem.toMapElement(this.map, this.props.setSelectedDrawed, withVisionCircle, withColision);
    if(response !== null)
    {
      Game.getInstance().addItem(newItem);
      let message = (new SocketMessage(newItem, SocketMessage.TypeMessage.ITEMADD)).toJson();
      SocketController.getSocket().send(message);
    }
    else
    {
      Entity.IncrId--;
    }
  }

  componentWillMount() { // MapControll creation
    this.map = this.context[MAP]; // get the google map object
    this.divDrawManager = window.document.createElement('div'); // create a body div
    this.map.controls[this.props.position].push(this.divDrawManager); // put the body div on the map
  }

  componentDidUpdate() {
    if (!this.props.canDraw()) {
      //delete the cursor option
      $('div.gm-style').find('div[style*="z-index: 2000000000;"]').remove();
      //window.google.maps.event.clearListeners(this.map, 'click'); // clear all action add Element on the map
      Game.getInstance().Regions.forEach(zone => { // foreach polygon zone
        window.google.maps.event.clearListeners(zone.toMapElement(), 'click'); // clear all action add Element on zone
        if (zone.toMapElement().editable)
          window.google.maps.event.addListener(zone.toMapElement(), 'click', () => !this.props.canDraw() && this.props.setSelectedMoved(zone.toMapElement()));
        else
          window.google.maps.event.addListener(zone.toMapElement(), 'click', () => !this.props.canDraw() && this.props.setSelectedDrawed(zone.toMapElement())); // clear all action add Element on zone
      });
    }
    else {
      Game.getInstance().Regions.forEach(zone => { // foreach polygon zone
        window.google.maps.event.clearListeners(zone.toMapElement(), 'click'); // clear all action add Element on zone
      });

      Game.getInstance().Flags.forEach(altar =>{
        if(altar.totoMapElement && altar.toMapElement().visionCircle)
          window.google.maps.event.clearListeners(altar.toMapElement().visionCircle, 'click'); // add the action listener click add Altar on zone
      })

      Game.getInstance().Flags.forEach(altar =>{
        if(altar.totoMapElement && altar.toMapElement().visionCircle)
          window.google.maps.event.clearListeners(altar.toMapElement().visionCircle, 'click'); // add the action listener click add Altar on zone
      })
    }

    if (this.props.canDrawItem) {
      if(this.props.typeItemDraw)
      {
        //set the cursor style as cross
        $('div.gm-style').find('div[style*="z-index: 106;"]').append('<div style="z-index: 2000000000; cursor: url(&quot;https://maps.gstatic.com/mapfiles/crosshair.cur&quot;), default; touch-action: none; position: absolute; left: -1280px; top: -332px; width: 2560px; height: 664px;"></div>');
        //this.map.addListener('click',this.addItem); // add the action listener click add Altar on the map
        Game.getInstance().Regions.forEach(zone => { // foreach polygon zone
          window.google.maps.event.addListener(zone.toMapElement(), 'click', (event) => this.addItem([event.latLng.lat(), event.latLng.lng()],this.props.typeItemDraw)); // add the action listener click add Altar on zone
        });

        Game.getInstance().Flags.forEach(altar =>{
          if(altar.totoMapElement && altar.toMapElement().visionCircle)
            window.google.maps.event.addListener(altar.toMapElement().visionCircle, 'click', (event) => this.addItem([event.latLng.lat(), event.latLng.lng()],this.props.typeItemDraw)); // add the action listener click add Altar on zone
        })
  
        Game.getInstance().Items.forEach(item =>{
          if(item.totoMapElement && item.toMapElement().visionCircle)
            window.google.maps.event.addListener(item.toMapElement().visionCircle, 'click', (event) => this.addItem([event.latLng.lat(), event.latLng.lng()],this.props.typeItemDraw)); // add the action listener click add Altar on zone
        })
      }
    }
    else if (this.props.canDrawAltar) {
      //set the cursor style as cross
      $('div.gm-style').find('div[style*="z-index: 106;"]').append('<div style="z-index: 2000000000; cursor: url(&quot;https://maps.gstatic.com/mapfiles/crosshair.cur&quot;), default; touch-action: none; position: absolute; left: -1280px; top: -332px; width: 2560px; height: 664px;"></div>');
      //this.map.addListener('click',this.addAltar); // add the action listener click add Altar on the map
      Game.getInstance().Regions.forEach(zone => { // foreach polygon zone
        window.google.maps.event.addListener(zone.toMapElement(), 'click', (event) => this.addAltar([event.latLng.lat(), event.latLng.lng()])); // add the action listener click add Altar on zone
      });

      Game.getInstance().Flags.forEach(altar =>{
        if(altar.totoMapElement && altar.toMapElement().visionCircle)
          window.google.maps.event.addListener(altar.toMapElement().visionCircle, 'click', (event) => this.addAltar([event.latLng.lat(), event.latLng.lng()])); // add the action listener click add Altar on zone
      })

      Game.getInstance().Items.forEach(item =>{
        if(item.totoMapElement && item.toMapElement().visionCircle)
          window.google.maps.event.addListener(item.toMapElement().visionCircle, 'click', (event) => this.addAltar([event.latLng.lat(), event.latLng.lng()])); // add the action listener click add Altar on zone
      })

    }
  }

  render() {
    return createPortal(this.props.children, this.divDrawManager);
  }
}