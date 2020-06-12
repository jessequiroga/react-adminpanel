import { Component } from 'react';
import { createPortal } from 'react-dom';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';



export default class ElementInfo extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  componentWillMount() {
    this.map = this.context[MAP];
    this.divElementInfo = window.document.createElement('div'); // create a body div
    this.divElementInfo.style = "width: 30%;height:30%;margin-right:1.25%;margin-top:1.25%";
    this.map.controls[this.props.position].push(this.divElementInfo); // put the body div on the map
  }

  componentDidUpdate() {
  }

  render()
  {
    return createPortal(this.props.children, this.divElementInfo);
  }

  componentWillUnmount() {
    this.divElementInfo.remove();
  }

}