import React from 'react'
import styles from './Player.scss'

var Player = React.createClass({
  getInitialState: function() {
    return {
      currentSongCache: {
        path: '',
        index: null,
        tags: {}
      }
    }
  },
  playerToggle: function() {
    if (this.props.musicPlayer.shown) {
      this.props.onHidePlayer()
    } else {
      this.props.onShowPlayer()
    }
  },
  updateCache: function(nextSong) {
    this.setState({
      currentSongCache: nextSong
    })
  },
  loadNextSong: function() {
    let nextSongIndex = parseInt(this.props.currentSongIndex) + 1
    if (!this.props.musicPlayer.playlist[nextSongIndex]) {
      return
    }
    setTimeout(() => {
      this.props.onUpdateCurrentSong(nextSongIndex);
    }, 150)
  },
  playFile: function(fileID) {
    console.log(fileID);
    this._player.pause()
    this._player.src = this.props.musicPlayer.playlist[fileID].path
    this._player.load()
    this._player.play();
    this._player.addEventListener('ended', () => {
      this.loadNextSong()
    })
  },
  componentWillReceiveProps: function(nextProps) {
    if (this.props.currentSongIndex !== nextProps.currentSongIndex) {
      this.playFile(nextProps.currentSongIndex)
      this.updateCache(nextProps.currentSongData)
    }
  },
  componentDidMount() {
    this._player.volume = 0.3
  },
  render: function() {
    let currentSongData = this.state.currentSongCache
    let songFormat = ''
    if (currentSongData.tags.artist && currentSongData.tags.title) {
      songFormat = currentSongData.tags.artist + ' - ' + currentSongData.tags.title
    } else {
      let stringSplit = currentSongData.path.split('\\')
      songFormat = stringSplit[stringSplit.length-1]
    }
    return (
      <div className={styles.playerDock + ' ' + (this.props.musicPlayer.shown ? styles.shown : styles.hidden)}>
        <div className={styles.playerToggle} onClick={this.playerToggle}>
          <i className={'fa fa-angle-' + (this.props.musicPlayer.shown ? 'down' : 'up')} aria-hidden="true"></i>
        </div>
        <span>
          {'Currently playing: ' + songFormat}
        </span>
        <audio style={{width: '100%'}} controls ref={(el) => { this._player = el }} />
      </div>
    );
  }

});

export default Player
