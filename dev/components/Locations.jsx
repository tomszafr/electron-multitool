const React = require('react');
import styles from './Locations.scss'

const Locations = React.createClass({
  getDefaultProps: function() {
    return {
      clickedLocation: {lat: '', lng: ''}
    }
  },
  calculateDistances: function() {
    let options = this.props.distanceOptions
    let destinations = this.props.locations.map((el) => { return new google.maps.LatLng(el.location.lat, el.location.lng) })
    this.distMatrix.getDistanceMatrix({
      origins: [this.props.origin.name],
      destinations: destinations,
      travelMode: options.travelMode,
      avoidHighways: options.avoidHighways,
      avoidTolls: options.avoidTolls
    }, (response, status) => {
      let distances = response.rows[0].elements
      this.props.onCalculateDistances(distances)
    });
  },
  addLocation: function(location) {
    this.props.onAddLocation(location)
  },
  handleSaveOrigin: function() {
    const address = this._originInput.value
    this.geocoder.geocode({ 'address': address }, (results, status) => {
      this.props.onSaveOrigin({ name: address,
        location:  { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() }
      })
    })
  },
  handleAdd: function() {
    if (this.props.clickedLocation.lat === '' || !this.props.clickedLocation.lng === '') {
      return
    }
    this.addLocation({ name: '',
      location:  { lat: this.props.clickedLocation.lat, lng: this.props.clickedLocation.lng }
    })
  },
  handleMassAdd: async function() {
    let input = this._textarea.value
    let splitInput = input.replace(/(\r\n|\n|\r)/gm,"").split(';')
    splitInput.forEach((el) => {
      this.geocoder.geocode({ 'address': el }, (results, status) => {
        this.addLocation({ name: el,
          location:  { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() }
        })
      })
    })
  },
  componentDidMount: function() {
    // Initialize Google APIs
    this.geocoder = new google.maps.Geocoder();
    this.distMatrix = new google.maps.DistanceMatrixService();
  },
  render: function() {
    const {locations, clickedLocation, origin, distances} = this.props
    const locationSpans = locations.map((el, index) => {
      return ((el.name !== '') ? ( <li key={'mapLocations'+index}>{index}: {el.name}</li> ) : ( <li key={'mapLocations'+index}>{index}: {el.location.lat} - {el.location.lng}</li> ))
    })
    const distanceSpans = distances.map((el, index) => {
     return ( <li key={'distanceResult' + index}>Do {((locations[index].name !== '') ? locations[index].name : index) + ': '} {el.distance.text} ({el.duration.text})</li> )
    })
    return (
      <div className={styles.locationsColumn}>
        <h2>Lokacje</h2>
        Origin: <input ref={(el) => this._originInput = el} type="text"></input><button onClick={this.handleSaveOrigin}>Save</button><br />
        { origin.name } <br />
        Clicked: {clickedLocation.lat} , {clickedLocation.lng} <br/>
        <button onClick={this.handleAdd}>Add Click</button>
        <ul>
          { locationSpans }
        </ul>
        <textarea ref={(el) => this._textarea = el}></textarea> <br/>
        <button onClick={this.handleMassAdd}>Mass Add</button><br />
        Odleglosci: <br/>
        <ul ref={(el) => this._resbox = el}>
          { distanceSpans }
        </ul>
        <button onClick={this.calculateDistances}>Calculate</button>

      </div> )
    }
  }
);

module.exports = Locations;
