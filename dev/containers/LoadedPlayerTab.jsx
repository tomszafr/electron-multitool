import PlayerTab from './../components/PlayerTab.jsx'
import { connect } from 'react-redux'
import { updateCurrentSong, loadPlaylist, showPlayer, addSongs, showSpinner } from './../actions.jsx'

const mapStateToProps = (state) => {
  return {
    musicPlayer: state.musicPlayer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showSpinner: () => {
      dispatch(showSpinner())
      return true
    },
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
