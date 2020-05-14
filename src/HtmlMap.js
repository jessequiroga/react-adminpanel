import { Component } from 'react';
import { createPortal } from 'react-dom';
import { MAP } from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';

export default class DrawManager extends Component {

  static contextTypes = { [MAP]: PropTypes.object }

  render() {
    return createPortal(this.props.children, this.divDrawManager);
  }
}