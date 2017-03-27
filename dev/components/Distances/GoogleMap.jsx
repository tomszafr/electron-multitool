const React = require('react');

import GoogleMapReact from 'google-map-react';
import Marker from "./Marker.jsx"

import { fitBounds } from 'google-map-react/utils';

const GoogleMap = React.createClass({
  getInitialState: function () {
    return {
      center: {lat: 52.26638550818717, lng: 19.39461492776877},
      zoom: 6,
      size: { width: 379, height: 217 },
      bounds: {}
    }
  },
  updateBounds: function () {
    let locationsBounds = new google.maps.LatLngBounds()
    if (this.props.locations.length > 0) {
      this.props.locations.forEach((el) => {
        locationsBounds.extend(el.location)
      })
    }
    if ((this.props.origin.set)) {
      locationsBounds.extend(this.props.origin.location)
    }

    let ne = locationsBounds.getNorthEast()
    let sw = locationsBounds.getSouthWest()

    if (!locationsBounds.isEmpty()) {
          this.setState({
            bounds: {ne: { lat: ne.lat(), lng: ne.lng() }, sw: { lat: sw.lat(), lng: sw.lng() }}
          }, () => {this.mapFitBounds()} )
    }
  },
  mapFitBounds: function () {
    if (Object.keys(this.state.bounds).length === 0) {
      return
    }
    let zoom = this.state.zoom
    let center
    if ((this.props.origin.set) && this.props.locations.length === 0) {
      center = this.props.origin.location
    } else if ((!this.props.origin.set) && this.props.locations.length === 1) {
      center = this.props.locations[0].location
    } else {
      let fitBoundsResult = fitBounds(this.state.bounds, this.state.size)
      zoom = fitBoundsResult.zoom
      center = fitBoundsResult.center
    }
    this.setState({
      center: center,
      zoom: zoom
    })
  },
  handleChange: function (result) {
    this.setState({
      size: result.size
    }, () => this.mapFitBounds())
  },
  componentDidUpdate: function (prevProps) {
    if ((this.props.locations !== prevProps.locations) || this.props.origin !== prevProps.origin) {
      this.updateBounds()
    }
  },
  render: function() {
    let markers = this.props.locations.map((el, index) => {
        return (
          <Marker key={'marker' + index} lat={el.location.lat} lng={el.location.lng} text={index} />
        )
    })
    return (
      <GoogleMapReact
        center={this.state.center}
        zoom={this.state.zoom}
        bootstrapURLKeys={{
          key: 'AIzaSyBGDE1Ry5H9_3uBKCMlUod5za3E01R6QJ0'
        }}
        onClick={this.props.handleClick}
        onChange={this.handleChange}
        resetBoundsOnResize={true}
      >
        {markers}
        {
          (this.props.origin.name !== '') ? (<Marker key={'originMarker'} lat={this.props.origin.location.lat} lng={this.props.origin.location.lng} text={'O'} origin={true} />) : null
        }
      </GoogleMapReact>
    )
  }
});

module.exports = GoogleMap;
