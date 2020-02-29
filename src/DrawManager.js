import { Component } from 'react';
import { createPortal } from 'react-dom';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import equal from 'fast-deep-equal'

export default class MapControl extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  addAltar = (event) =>
  {
    let marker = new this.google.maps.Marker({
        position: event.latLng,
        title: 'new',
        icon:{ // Initaite the icon of the markers
            url: `/mapMarker.png`, // take the icon on /public
            scaledSize: new window.google.maps.Size(100, 100) // resize the icon
        },
        map: this.map
    });
    this.google.maps.event.addListener(marker, 'click',()=>this.props.setSelectedDrawed(marker));
  }

  addItem = (event) =>
  {
    let marker = new this.google.maps.Marker({
        position: event.latLng,
        title: 'new',
        icon:{ // Initaite the icon of the markers
            url: `/skateboarding.svg`, // take the icon on /public
            scaledSize: new window.google.maps.Size(50, 50) // resize the icon
        },
        map: this.map
    });
    this.google.maps.event.addListener(marker, 'click',()=>this.props.setSelectedDrawed(marker));
  }

  addPolygone = (event) =>
  {
    let poly = new this.google.maps.Polygon({
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        map: this.map
    });

    this.google.maps.event.clearListeners(this.map, 'click');

    // Add a listener for the click event
    this.map.addListener('click',(event)=>this.addLatLng(event,poly));
    this.google.maps.event.addListener(poly, 'click',()=>this.props.setSelectedDrawed(poly));
  }

  addLatLng(event,poly) {
    let path = poly.getPath();
  
    // Because path is an MVCArray, we can simply append a new coordinate
    // and it will automatically appear.
    path.push(event.latLng);
  
    // Add a new marker at the new plotted point on the polyline.
    let marker = new this.google.maps.Marker({
      position: event.latLng,
      title: '#' + path.getLength(),
      map: this.map
    });
  }

  componentWillMount() {
    this.map = this.context[MAP];
    this.google = window.google;
    this.divDrawManager = window.document.createElement('div');
    this.map.controls[this.props.position].push(this.divDrawManager);
  }

  componentDidUpdate() {
    if(this.props.canDrawItem || this.props.canDrawAltar || this.props.canDrawMapZone)
        this.google.maps.event.clearListeners(this.map, 'click');

    if(this.props.canDrawItem)
    {
        this.map.addListener('click',this.addItem);
    }
    else if(this.props.canDrawAltar)
    {
        this.map.addListener('click',this.addAltar);
    }
    else if(this.props.canDrawMapZone)
    {
        this.map.addListener('click',this.addPolygone);
    }
        
  }

  componentWillUnmount() {
    this.map.controls[this.props.position].removeAt(this.divIndex);
  }
  render() {
    return createPortal(this.props.children, this.divDrawManager);
  }
}