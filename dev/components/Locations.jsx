const React = require('react');
import styles from './Locations.scss'

const Locations = React.createClass({
  getDefaultProps: function() {
    return {
      clickedLocation: {lat: '', lng: ''}
    }
  },
  getInitialState: function() {
    return {
      massAddVisibility: false
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
  handleSaveOrigin: function(event) {
    event.preventDefault()
    const address = this._originInput.value
    this.geocoder.geocode({ 'address': address }, (results, status) => {
      this.props.onSaveOrigin({ name: results[0].formatted_address,
        location:  { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() }
      })
    })
  },
  handleMassAdd: async function() {
    let input = this._textarea.value
    let splitInput = input.replace(/(\r\n|\n|\r)/gm,"").split(';')
    splitInput.forEach((el) => {
      this.geocoder.geocode({ 'address': el }, (results, status) => {
        console.log(results);
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
  massToggle: function() {
    this.setState({
      massAddVisibility: !this.state.massAddVisibility
    }, () => { if (this.state.massAddVisibility) {this._textarea.focus()} })
  },
  render: function() {
    const {locations, clickedLocation, origin, distances} = this.props
    const locationRows = locations.map((el, index) => {
      return (
        <tr key={`locations${index}`}>
          <td>{index}</td><td>{(el.name !== '') ? el.name : `${el.location.lat} , ${el.location.lng}`}</td>
        </tr>
      )
    })
    const distanceSpans = distances.map((el, index) => {
     return ( <li key={'distanceResult' + index}>Do {((locations[index].name !== '') ? locations[index].name : index) + ': '} {el.distance.text} ({el.duration.text})</li> )
    })
    return (
      <div className={styles.locationsColumn}>
        <h2>Distance matrix</h2>
        <div className={styles.originBox}>
          <h3>Origin setup</h3><br />
          <form className={styles.originInput} onSubmit={this.handleSaveOrigin}>
            <input ref={(el) => this._originInput = el} type="text"></input>
            <button type='submit'>Save</button><br />
          </form>
          <span>{ origin.name }</span>
        </div>
        <div className={styles.locationsBox}>
          <h3>Destinations setup</h3>
          <table className={styles.locationsTable}>
            <thead>
              <tr>
                <td>No.</td><td>Location</td>
              </tr>
            </thead>
            <tbody>
              { locationRows }
            </tbody>
          </table>
          <button onClick={this.massToggle}>Mass add</button>
          <div>
            <form>
              <textarea ref={(el) => this._textarea = el} className={`${styles.massAdd} ${(this.state.massAddVisibility) ? styles.shown : styles.hidden}`} ></textarea> <br/>
              <button style={(!this.state.massAddVisibility) ? {display: 'none'} : {}} onClick={this.handleMassAdd}>Add locations</button><br />
            </form>
          </div>
        </div>
        <div className={styles.outputBox}>
          <h3>Results:</h3>
          <ul ref={(el) => this._resbox = el}>
            { distanceSpans }
          </ul>
          <button onClick={this.calculateDistances}>Calculate</button>
        </div>
      </div> )
    }
  }
);

export default Locations;
