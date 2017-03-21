import { combineReducers } from 'redux'
import { LOAD_FILE, CHANGE_TEXT, CLOSE_FILE, UPDATE_CURRENT_SONG, LOAD_PLAYLIST, SHOW_PLAYER, HIDE_PLAYER, ADD_SONGS, ADD_LOCATION, LOAD_DISTANCES, SAVE_ORIGIN, UPDATE_DISTANCE_OPTIONS } from './actions.jsx'

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

function distCalculator(state = {
  origin: { name: '', location: {} },
  locations: [],
  distances: [],
  distanceOptions: { travelMode: 'DRIVING', avoidHighways: false, avoidTolls: false }
}, action) {
  switch (action.type) {
    case ADD_LOCATION:
      return Object.assign({}, state, {
        locations: [
          ...state.locations,
          action.location
        ]
      })
    case LOAD_DISTANCES:
      return Object.assign({}, state, {
        distances: action.distances
      })
    case SAVE_ORIGIN:
      return Object.assign({}, state, {
        origin: action.location
      })
    case UPDATE_DISTANCE_OPTIONS:
      return Object.assign({}, state, {
        distanceOptions: action.options
      })
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
  fileContent,
  musicPlayer,
  distCalculator
})

export default theAppStore
