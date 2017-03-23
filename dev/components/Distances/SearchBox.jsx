import React from 'react';
import styles from './SearchBox.scss'


const SearchBox = React.createClass({
  handleSaveOrigin: function(event) {
    event.preventDefault()
    const address = this._input.value
    this.geocoder.geocode({ 'address': address }, (results, status) => {
      this.props.onSaveOrigin({ name: results[0].formatted_address,
        location:  { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() }
      })
    })
  },
  componentDidMount: function () {
    this.geocoder = new google.maps.Geocoder();
    this.searchBox = new google.maps.places.SearchBox(this._input);
  },
  render() {
    return (
      <form className={styles.originInput} onSubmit={this.handleSaveOrigin}>
        <input placeholder={this.props.placeholder} ref={(el) => this._input = el} type="text"/>
        <button type='submit'>Save</button>
      </form>
    )
  }
})

export default SearchBox
