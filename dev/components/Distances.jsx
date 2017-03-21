const React = require('react');
import GoogleMap from "./GoogleMap.jsx"
import Locations from "./Locations.jsx"
import DistanceOptions from "./DistanceOptions.jsx"

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
      <div className="sectionContainer">
        <div onClick={this.containerClick} style={{width: '100%', height: '75%', display: 'flex'}}>
          <div style={{width: '50%', height: '100%', border: '1px solid black'}}>
            <GoogleMap handleClick={this.handleClick} locations={this.props.locations} origin={this.props.origin}/>
          </div>
          <Locations distanceOptions={this.props.distanceOptions} origin={this.props.origin} onSaveOrigin={this.props.onSaveOrigin} locations={this.props.locations} onAddLocation={this.props.onAddLocation} clickedLocation={this.state.clickedLocation} onCalculateDistances={this.props.onCalculateDistances} distances={this.props.distances}/>
        </div>
        <DistanceOptions distanceOptions={this.props.distanceOptions} onUpdateDistanceOptions={this.props.onUpdateDistanceOptions}/>
      </div>
    )
  }
});

module.exports = Distances;
