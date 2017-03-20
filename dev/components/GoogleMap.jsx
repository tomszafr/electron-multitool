const React = require('react');

import GoogleMapReact from 'google-map-react';
import Marker from "./Marker.jsx"

const GoogleMap = React.createClass({
  getDefaultProps: function () {
    return {
      center: {lat: 50.296, lng: 18.93},
      zoom: 15,
      size: { width: 300, height: 300 },
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
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        bootstrapURLKeys={{
          key: 'AIzaSyBGDE1Ry5H9_3uBKCMlUod5za3E01R6QJ0'
        }}
        onClick={this.props.handleClick}
      >
        {markers}
        {
          (this.props.origin.name !== '') ? (<Marker key={'originMarker'} lat={this.props.origin.location.lat} lng={this.props.origin.location.lng} text={'S'} origin={true} />) : null
        }
      </GoogleMapReact>
    )
  }
});

module.exports = GoogleMap;