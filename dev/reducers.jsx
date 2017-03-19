import { combineReducers } from 'redux'
import { LOAD_FILE, CHANGE_TEXT, CLOSE_FILE, UPDATE_CURRENT_SONG, LOAD_PLAYLIST, SHOW_PLAYER, HIDE_PLAYER, ADD_SONGS, SHOW_SPINNER, HIDE_SPINNER } from './actions.jsx'

function musicPlayer (state = { shown: false, playlist: [] }, action) {
  switch (action.type) {
    case LOAD_PLAYLIST:
      return Object.assign({}, state, {
        playlist: action.playlist
      })
    case ADD_SONGS:
      return Object.assign({}, state, {
        playlist: [
          ...state.playlist,
          ...action.newSongs
        ]
      })
    case UPDATE_CURRENT_SONG:
      return Object.assign({}, state, {
        currentSongIndex: action.index
      })
    case SHOW_PLAYER:
      return Object.assign({}, state, {shown: true})
    case HIDE_PLAYER:
      return Object.assign({}, state, {shown: false})
    default:
      return state
  }
}
function spinner (state = false, action) {
  switch (action.type) {
    case SHOW_SPINNER:
      console.log('show_spinner');
      return true
    case HIDE_SPINNER:
      console.log('hide_spinner');
      return false
    default:
      return state

  }
}

function fileContent (state = {}, action) {
  switch (action.type) {
    case LOAD_FILE:
      return Object.assign({}, state.fileContent, action.fileContent)
    case CHANGE_TEXT:
      return Object.assign({}, state, {
        text: action.text
      })
    case CLOSE_FILE:
      return {
        text: '',
        filepath: ''
      }
    default:
      return state
  }
}
const theAppStore = combineReducers({
  spinner,
  fileContent,
  musicPlayer
})

export default theAppStore
