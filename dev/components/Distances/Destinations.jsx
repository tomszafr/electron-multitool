import React from 'react'
import styles from './Destinations.scss'
import {showModal, openFile} from './../../node-methods/file-operations.jsx'

const Destinations = React.createClass({
  getInitialState: function() {
    return {
      massAddVisibility: false
    }
  },
  handleClear: function () {
    let modalOptions = {
      type: 'question',
      title: 'Confirm clear',
      message: 'Are you sure?',
      buttons: ['Yes', 'Cancel']
    }
    if (showModal(modalOptions) === 0) {
      this.props.onClearLocations()
    } else {
        return
    }
  },
  handleRemove: function (event) {
    this.props.onRemoveLocation(event.target.dataset.locationid)
  },
  massToggle: function() {
    this.setState({
      massAddVisibility: !this.state.massAddVisibility
    }, () => { if (this.state.massAddVisibility) {this._textarea.focus()} })
  },
  addLocation: function(location) {
    this.props.onAddLocation(location)
  },
  handleTextSubmit: function () {
    this.props.handleMassAdd(this._textarea.value)
  },
  loadLocations: function() {
    let openOptions = {
      filters: [
        {name: 'Text Files', extensions: ['txt']}
      ]
    }
    openFile('txt', openOptions, this.loadCallback)
  },
  loadCallback: function(data, filepath) {
    this.handleMassAdd(data)
  },
  handleMassAdd: async function(input) {
    if (input !== '') {
      let splitInput = input.replace(/(\r\n|\n|\r)/gm,"").split(';')
      splitInput.forEach((el) => {
        this.geocoder.geocode({ 'address': el }, (results, status) => {
          this.addLocation({ name: el,
            location:  { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() }
          })
        })
      })
      this._textarea.value = ''
    }
  },
  componentDidMount: function() {
    // Initialize Google APIs
    this.geocoder = new google.maps.Geocoder();
  },
  render: function() {
    const {locations} = this.props
    let locationRows = locations.map((el, index) => {
      return (
        <tr key={`locationsRow${index}`}>
          <td>{index}</td><td>{(el.name !== '') ? el.name : `${el.location.lat} , ${el.location.lng}`}</td><td><i data-locationid={index} onClick={this.handleRemove} className="fa fa-times" aria-hidden="true"></i></td>
        </tr>
      )
    })
    return (
      <div className={styles.locationsBox}>
        <h3>Destinations setup</h3>
        <table className={styles.locationsTable}>
          <thead>
            <tr>
              <td>No.</td><td colSpan="2">Location</td>
            </tr>
          </thead>
          <tbody>
            { (locationRows.length === 0) ? <tr><td colSpan="3">No destinations</td></tr> : locationRows }
          </tbody>
        </table>
        <button onClick={this.massToggle}>Toggle input</button><button onClick={this.loadLocations}>Load a file</button><button onClick={this.handleClear}>Clear</button>
        <div className={styles.massInput}>
          <textarea ref={(el) => this._textarea = el} className={`${styles.massAdd} ${(this.state.massAddVisibility) ? styles.shown : styles.hidden}`} ></textarea>
          <button onClick={this.handleTextSubmit} style={(!this.state.massAddVisibility) ? {display: 'none'} : {}}>Add locations</button><br/>
        </div>
      </div>
    )
  }
})

export default Destinations
