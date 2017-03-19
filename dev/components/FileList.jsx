const React = require('react');

const FileList = React.createClass({
  handleClick: function(event) {
    this.props.handleClick(parseInt(event.currentTarget.dataset.key))
  },
  render: function() {
    let tableStyle = {
      backgroundColor: 'white',
      width: '100%',
      left: '0',
      right: '0',
      maxHeight: '300px',
      fontFamily: 'Arial',
      fontSize: '15px',
      color: 'black',
      padding: '10px',
      overflow: 'auto'
    }
    let trStyle = {
      cursor: 'pointer',
      padding: '6px'
    }
    return (
      <table style={tableStyle}>
        <thead>
          <tr>
            <td>Filepath</td><td>Title</td><td>Artist</td><td>Album</td>
          </tr>
        </thead>
        <tbody>
          {this.props.children.map((element, index) => {
            let tags = (element.tags) ? {title: element.tags.title, artist: element.tags.artist, album: element.tags.album} : {title: '', artist: '', album: ''}
            return (
              <tr style={trStyle} className={(this.props.currentSong === element.index) ? 'currentSong' : null} key={'reactKeyPlayer' + element.index} data-key={element.index} onClick={this.handleClick}>
                <td>{element.path}</td><td>{tags.title}</td><td>{tags.artist}</td><td>{tags.album}</td>
              </tr>
            )
          })
          }
        </tbody>
      </table>
    )
  }
});

module.exports = FileList;
