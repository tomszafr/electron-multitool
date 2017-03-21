const React = require('react');

const Marker = React.createClass({
  render: function() {
    const MARKER_SIZE = 16;
    let markerStyle = {
      position: 'absolute',
      width: MARKER_SIZE + 'px',
      height: MARKER_SIZE + 'px',
      textAlign: 'center',
      lineHeight: MARKER_SIZE + 'px',
      left: -MARKER_SIZE / 2,
      top: -MARKER_SIZE / 2
    }
    const iconStyle = {
      position: 'absolute',
      top: '-30px',
      left: '-5px',
      right: '0',
      margin: 'auto',
      fontSize: '46px',
      color: (this.props.origin) ? 'blue' : 'red',
    }
    const spanStyle = {
      color: (this.props.origin) ? 'white' : 'white',
      position: 'absolute',
      top: '-21px',
      left: '1px',
      right: '0',
      display: 'block',
      backgroundColor: (this.props.origin) ? 'blue' : 'red',
      height: '15px',
      width: '15px',
      fontSize: '17px',
      fontWeight: 'bold'
    }
    return (
      <div style={markerStyle}>
        <i className="fa fa-map-marker" style={iconStyle} aria-hidden="true"></i><span style={spanStyle}>{this.props.text}</span>
      </div>
    )
  }
})

module.exports = Marker;
