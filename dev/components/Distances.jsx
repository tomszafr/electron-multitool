const React = require('react');
import GoogleMap from "./GoogleMap.jsx"
import Locations from "./Locations.jsx"
import DistanceOptions from "./DistanceOptions.jsx"
import styles from './Distances.scss'

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
  handleLocationAdd: function() {
    const {clickedLocation} = this.state
    if (clickedLocation.lat === '' || clickedLocation.lng === '') {
      return
    }
    this.props.onAddLocation({ name: '',
      location:  { lat: clickedLocation.lat, lng: clickedLocation.lng }
    })
  },
  handleSaveOrigin: function() {
    const { clickedLocation } = this.state
    if (clickedLocation.lat === '' || clickedLocation.lng === '') {
      return
    }
    this.geocoder.geocode({ 'address': `${clickedLocation.lat},${clickedLocation.lng}`}, (results, status) => {
      this.props.onSaveOrigin({ name: results[0].formatted_address,
        location:  { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() }
      })
    })
  },
  componentDidMount: function() {
    // Initialize Google APIs
    this.geocoder = new google.maps.Geocoder();
  },
  render: function() {
    return (
      <div className={styles.sectionContainer}>
        <div className={styles.mapColumn}>
          <div className={styles.clickedBox}>
            Click location: <br />
            {(this.state.clickedLocation.lat !== '' || this.state.clickedLocation.lng !== '') ?
              (<div className={styles.coordinates}><span style={{color: 'green'}}>{this.state.clickedLocation.lat}</span> , <span style={{color: 'purple'}}>{this.state.clickedLocation.lng}</span></div>)
            : <div className={styles.coordinates}>Click somewhere!</div>}
            <button onClick={this.handleLocationAdd}>Add as location</button>
            <button onClick={this.handleSaveOrigin}>Add as origin</button>
          </div>
          <div className={styles.mapContainer}>
              <GoogleMap handleClick={this.handleClick} locations={this.props.locations} origin={this.props.origin}/>
          </div>
          <DistanceOptions distanceOptions={this.props.distanceOptions} onUpdateDistanceOptions={this.props.onUpdateDistanceOptions}/>
        </div>
        <Locations distanceOptions={this.props.distanceOptions} origin={this.props.origin} onSaveOrigin={this.props.onSaveOrigin} locations={this.props.locations} onAddLocation={this.props.onAddLocation} clickedLocation={this.state.clickedLocation} onCalculateDistances={this.props.onCalculateDistances} distances={this.props.distances}/>
      </div>
    )
  }
});

module.exports = Distances;
