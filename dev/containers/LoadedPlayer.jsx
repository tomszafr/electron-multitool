import Player from './../components/Player.jsx'
import { connect } from 'react-redux'
import { updateCurrentSong, hidePlayer, showPlayer } from './../actions.jsx'

const mapStateToProps = (state) => {
  return {
    musicPlayer: state.musicPlayer,
    currentSongIndex: state.musicPlayer.currentSongIndex,
    currentSongData: state.musicPlayer.playlist[state.musicPlayer.currentSongIndex]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateCurrentSong: (index) => {
      dispatch(updateCurrentSong(index))
    },
    onShowPlayer: () => {
      dispatch(showPlayer())
    },
    onHidePlayer: () => {
      dispatch(hidePlayer())
    }
  }
}

const LoadedPlayer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)

export default LoadedPlayer
