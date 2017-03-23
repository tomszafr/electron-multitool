import React from 'react'
import styles from './Locations.scss'
import Destinations from './Destinations.jsx'
import SearchBox from './SearchBox.jsx'

const Locations = React.createClass({
  getDefaultProps: function() {
    return {
      clickedLocation: {lat: '', lng: ''}
    }
  },
  calculateDistances: function() {
    if (this.props.locations.length <= 0) {
      return
    }
    let options = this.props.distanceOptions
    let destinations = this.props.locations.map((el) => { return new google.maps.LatLng(el.location.lat, el.location.lng) })
    this.distMatrix.getDistanceMatrix({
      origins: [new google.maps.LatLng(this.props.origin.location.lat, this.props.origin.location.lng)],
      destinations: destinations,
      travelMode: options.travelMode,
      avoidHighways: options.avoidHighways,
      avoidTolls: options.avoidTolls
    }, (response, status) => {
      let distancesIn = response.rows[0].elements
      let returnDistances = distancesIn.map((el, index) => {
        return Object.assign({}, el, { name: this.props.locations[index].name, location: { lat: this.props.locations[index].location.lat, lng: this.props.locations[index].location.lng} })
      })
      this.props.onCalculateDistances(returnDistances)
    });
  },
  componentDidMount: function() {
    // Initialize Google APIs
    this.geocoder = new google.maps.Geocoder();
    this.distMatrix = new google.maps.DistanceMatrixService();
  },
  render: function() {
    const {locations, clickedLocation, origin, distances} = this.props
    const distanceRows = distances.map((el, index) => {
     return (
       <tr key={'distanceResult' + index}>
         <td>{index}</td><td>{(el.name !== '') ? el.name : `${el.location.lat}, ${el.location.lng}` }</td><td>{el.distance.text}</td><td>{el.duration.text}</td>
       </tr>
     )
    })
    return (
      <div className={styles.locationsColumn}>
        <h2>Distance matrix</h2>
        <div className={styles.originBox}>
          <h3>Origin setup</h3>
          <SearchBox onSaveOrigin={this.props.onSaveOrigin} placeholder={'Type in the origin location...'}/>
          <span>{ origin.name }</span>
        </div>
        <Destinations {...this.props} />
        <div className={styles.calculateButton}>
          <button onClick={this.calculateDistances}>Calculate!</button>
        </div>
        {
          (distanceRows.length > 0) ? (
            <div className={styles.outputBox}>
              <h3>Results:</h3>
              <table className={styles.resultsTable}>
                <thead>
                  <tr>
                    <td>No.</td><td>Location</td><td>Distance</td><td>Duration</td>
                  </tr>
                </thead>
                <tbody>
                  { distanceRows }
                </tbody>
              </table>
            </div>
          ) : null
        }
      </div> )
    }
  }
);

export default Locations;
