const React = require('react');

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
      <div style={{width: '50%', height: '100%'}}>
        <h2>Search Options:</h2>
        <form>
          <select ref={(el) => this._travelMode = el} onChange={this.handleChange} name="travelMode">
           <option value="DRIVING">DRIVING</option>
           <option value="TRANSIT">TRANSIT</option>
           <option value="WALKING">WALKING</option>
          </select>
          <label>Avoid highways: </label>
          <input ref={(el) => this._avoidHighways = el} onChange={this.handleChange} type="checkbox" name="avoidHighways" />
          <label>Avoid tolls: </label>
          <input ref={(el) => this._avoidTolls = el} onChange={this.handleChange} type="checkbox" name="avoidTolls" />
        </form>
      </div>
    )
  }
});

module.exports = DistanceOptions;
