var React = require('react');

var Player = React.createClass({
  getInitialState: function() {
    return {
      shown: false
    }
  },
  playerToggle: function() {
    this.setState({
      shown: !this.state.shown
    })
  },
  render: function() {
    return (
      <div className={"playerDock " + (this.state.shown ? 'shown' : 'hidden')}>
        <div className="playerToggle" onClick={this.playerToggle}>
          <i className={'fa fa-angle-' + (this.state.shown ? 'down' : 'up')} aria-hidden="true"></i>
        </div>
        Test
      </div>
    );
  }

});

module.exports = Player;
