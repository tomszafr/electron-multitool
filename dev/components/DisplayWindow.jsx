const React = require('react');

const DisplayWindow = React.createClass({
  render: function() {

    var self = this;

    return (
          <div ref={(el) => this._input = el}
                className={this.props.cssClass}
                contentEditable={(this.props.editContent) ? true : false}
                onInput={function() {
                  self.props.editContent(self._input.innerText)
                }}>
              {this.props.children}
          </div>
        )
    }

});

module.exports = DisplayWindow;
