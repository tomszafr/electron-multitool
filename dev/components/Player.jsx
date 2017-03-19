var React = require('react');

var Player = React.createClass({
  playerToggle: function() {
    if (this.props.musicPlayer.shown) {
      this.props.onHidePlayer()
    } else {
      this.props.onShowPlayer()
    }
  },
  loadNextSong: function() {
    let nextSongIndex = parseInt(this.props.currentSongIndex) + 1
    if (!this.props.musicPlayer.playlist[nextSongIndex]) {
      return
    }
    this.props.onUpdateCurrentSong(nextSongIndex)
  },
  playFile: function(fileID) {
    this._player.pause()
    this._player.src = this.props.musicPlayer.playlist[fileID].path
    this._player.load()
    this._player.play()
    this._player.addEventListener('ended', () => {
      this.loadNextSong()
    })
  },
  componentWillReceiveProps: function(nextProps) {
    if (this.props.currentSongIndex !== nextProps.currentSongIndex) {
      this.playFile(nextProps.currentSongIndex)
    }
  },
  componentDidMount() {
    this._player.volume = 0.3
  },
  render: function() {
    let audioStyle = {
      width: '100%'
    }
    let currentSongData = this.props.currentSongData
    let songFormat
    if (currentSongData) {
      if (currentSongData.tags) {
        songFormat = currentSongData.tags.artist + ' - ' + currentSongData.tags.title
      } else {
        let stringSplit = currentSongData.path.split('\\')
        songFormat = stringSplit[stringSplit.length-1]
      }
    } else {
      songFormat = ''
    }
    return (
      <div className={"playerDock " + (this.props.musicPlayer.shown ? 'shown' : 'hidden')}>
        <div className="playerToggle" onClick={this.playerToggle}>
          <i className={'fa fa-angle-' + (this.props.musicPlayer.shown ? 'down' : 'up')} aria-hidden="true"></i>
        </div>
        <span>
          {'Currently playing: ' + songFormat}
        </span>
        <audio style={audioStyle} controls ref={(el) => { this._player = el }} />
      </div>
    );
  }

});

module.exports = Player;
