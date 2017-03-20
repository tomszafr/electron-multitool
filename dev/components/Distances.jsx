const React = require('react');
import GoogleMap from "./GoogleMap.jsx"
import Locations from "./Locations.jsx"

const Distances = React.createClass({
  getInitialState: function() {
    return {
      clickedLocation: {lat: '', lng: ''}
    }
  },
  handleClick: function({x, y, lat, lng, event}) {
    this.setState({
      clickedLocation: {lat: lat, lng: lng}
    })
  },
  render: function() {
    return (
      <div style={{width: '100%', height: '100%', display: 'flex'}}>
        <div style={{width: '50%', height: '50%'}}>
          <GoogleMap handleClick={this.handleClick} locations={this.props.locations} origin={this.props.origin}/>
        </div>
        <Locations origin={this.props.origin} onSaveOrigin={this.props.onSaveOrigin} locations={this.props.locations} onAddLocation={this.props.onAddLocation} clickedLocation={this.state.clickedLocation} onCalculateDistances={this.props.onCalculateDistances} distances={this.props.distances}/>
      </div>
    )
  }
});

module.exports = Distances;
