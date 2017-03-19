import PlayerTab from './../components/PlayerTab.jsx'
import { connect } from 'react-redux'
import { updateCurrentSong, loadPlaylist, showPlayer, addSongs } from './../actions.jsx'

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
    onLoadPlaylist: (playlist) => {
      dispatch(loadPlaylist(playlist))
      dispatch(showPlayer())
    },
    onAddSongs: (newSongs) => {
      dispatch(addSongs(newSongs))
    }
  }
}

const LoadedPlayerTab = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerTab)

export default LoadedPlayerTab
