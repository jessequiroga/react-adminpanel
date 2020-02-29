import { Component } from 'react';
import { createPortal } from 'react-dom';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import Altar from './model/elements/Altar.js';
import Item from './model/elements/Item.js';
import Game from './model/Game.js';

export default class MapControl extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  addAltar = (event) =>
  {
    let newAltar = new Altar(event.latLng);
    let marker = newAltar.toMapElement();
    marker.setMap(this.map);
    window.google.maps.event.addListener(marker, 'click',()=>this.props.setSelectedDrawed(marker));
    Game.getInstance().addAltar(newAltar);
  }

  addItem = (event) =>
  {
    let newItem = new Item(event.latLng,{url:`/skateboarding.svg`,scaledSize: new window.google.maps.Size(50, 50)});
    let marker = newItem.toMapElement();
    console.log(marker);
    marker.setMap(this.map);
    window.google.maps.event.addListener(marker, 'click',()=>this.props.setSelectedDrawed(marker));
    Game.getInstance().addItem(newItem);
  }

  componentWillMount() {
    this.map = this.context[MAP];
    this.divDrawManager = window.document.createElement('div');
    this.map.controls[this.props.position].push(this.divDrawManager);
  }

  componentDidUpdate() {
    if(this.props.canDrawItem || this.props.canDrawAltar || this.props.canDrawMapZone)
        window.google.maps.event.clearListeners(this.map, 'click');

    if(this.props.canDrawItem)
    {
        this.map.addListener('click',this.addItem);
    }
    else if(this.props.canDrawAltar)
    {
        this.map.addListener('click',this.addAltar);
    }
        
  }

  componentWillUnmount() {
    this.map.controls[this.props.position].removeAt(this.divIndex);
  }
  render() {
    return createPortal(this.props.children, this.divDrawManager);
  }
}