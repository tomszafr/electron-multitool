const React = require('react');

const DisplayWindow = React.createClass({
  render: function() {
    return (
          <div className={this.props.cssClass}>
              {this.props.children}
          </div>
        )
    }
});

module.exports = DisplayWindow;
