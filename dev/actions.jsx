// Generate action creator functions
function makeActionCreator(type, ...argNames) {
  return function(...args) {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}

// File operations
export const CLOSE_FILE = 'CLOSE_FILE'
export const LOAD_FILE = 'LOAD_FILE'
export const closeFile = makeActionCreator(CLOSE_FILE)
export const loadFile = makeActionCreator(LOAD_FILE, 'fileContent')

// Notepad
export const CHANGE_TEXT = 'CHANGE_TEXT'
export const changeText = makeActionCreator(CHANGE_TEXT, 'text')

// Music player
export const SHOW_PLAYER = 'SHOW_PLAYER'
export const HIDE_PLAYER = 'HIDE_PLAYER'
export const LOAD_PLAYLIST = 'LOAD_PLAYLIST'
export const ADD_SONGS = 'ADD_SONGS'
export const UPDATE_CURRENT_SONG = 'UPDATE_CURRENT_SONG'
export const showPlayer = makeActionCreator(SHOW_PLAYER)
export const hidePlayer = makeActionCreator(HIDE_PLAYER)
export const loadPlaylist = makeActionCreator(LOAD_PLAYLIST, 'playlist')
export const addSongs = makeActionCreator(ADD_SONGS, 'newSongs')
export const updateCurrentSong = makeActionCreator(UPDATE_CURRENT_SONG, 'index')

// Distance matrix
export const SAVE_ORIGIN = 'SAVE_ORIGIN'
export const ADD_LOCATION = 'ADD_LOCATION'
export const REMOVE_LOCATION = 'REMOVE_LOCATION'
export const CLEAR_LOCATIONS = 'CLEAR_LOCATIONS'
export const UPDATE_DISTANCE_OPTIONS = 'UPDATE_DISTANCE_OPTIONS'
export const LOAD_DISTANCES = 'LOAD_DISTANCES'
export const saveOrigin = makeActionCreator(SAVE_ORIGIN, 'location')
export const addLocation = makeActionCreator(ADD_LOCATION, 'location')
export const removeLocation = makeActionCreator(REMOVE_LOCATION, 'index')
export const clearLocations = makeActionCreator(CLEAR_LOCATIONS)
export const updateDistanceOptions = makeActionCreator(UPDATE_DISTANCE_OPTIONS, 'options')
export const loadDistances = makeActionCreator(LOAD_DISTANCES, 'distances')
