const React = require('react');

const Spinner = React.createClass({
  render: function() {
    return (
      <div className={'spinner ' + ((this.props.spinner) ? 'shown' : 'hidden')}>Loading...</div>
    )
  }
});

module.exports = Spinner;
