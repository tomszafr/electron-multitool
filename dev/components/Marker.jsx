const React = require('react');

const Marker = React.createClass({
  render: function() {
    const MARKER_SIZE = 15;
    let markerStyle = {
      position: 'absolute',
      width: MARKER_SIZE + 'px',
      height: MARKER_SIZE + 'px',
      backgroundColor: (this.props.origin) ? 'yellow' : 'red',
      borderRadius: '50%',
      textAlign: 'center',
      fontWeight: 'bold',
      lineHeight: MARKER_SIZE + 'px',
      left: -MARKER_SIZE / 2,
      top: -MARKER_SIZE / 2
    }
    return (
      <div style={markerStyle}>
        {this.props.text}
      </div>
    )
  }
})

module.exports = Marker;
