import React from 'react'
import styles from './DistanceOptions.scss'

const DistanceOptions = React.createClass({
  handleChange: function() {
    const options = {
      travelMode: this._travelMode.value,
      avoidHighways: this._avoidHighways.checked,
      avoidTolls: this._avoidTolls.checked
    }
    this.props.onUpdateDistanceOptions(options)
  },
  componentDidMount: function() {
    this._travelMode.value = this.props.distanceOptions.travelMode
    this._avoidHighways.checked = this.props.distanceOptions.avoidHighways
    this._avoidTolls.checked = this.props.distanceOptions.avoidTolls
  },
  render: function() {
    return (
      <div className={styles.optionsWrapper}>
        <h2>Options</h2>
        <div className={styles.optionsBox}>
          <div className={styles.selectBox}>
            Travel Mode:<br />
            <select ref={(el) => this._travelMode = el} onChange={this.handleChange} name="travelMode">
             <option value="DRIVING">DRIVING</option>
             <option value="TRANSIT">TRANSIT</option>
             <option value="WALKING">WALKING</option>
            </select>
          </div>
          <div className={styles.checkboxBox}>
            <div className={styles.checkbox}>
              <label htmlFor="avoidHighways">Avoid highways:</label>
              <input ref={(el) => this._avoidHighways = el} onChange={this.handleChange} type="checkbox" name="avoidHighways" />
            </div>
            <div className={styles.checkbox}>
              <label htmlFor="avoidTolls">Avoid tolls:</label>
              <input ref={(el) => this._avoidTolls = el} onChange={this.handleChange} type="checkbox" name="avoidTolls" />
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = DistanceOptions;
