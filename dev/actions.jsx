export const LOAD_FILE = 'LOAD_FILE'
export const CLOSE_FILE = 'CLOSE_FILE'
export const CHANGE_TEXT = 'CHANGE_TEXT'
export const LOAD_PLAYLIST = 'LOAD_PLAYLIST'
export const ADD_SONGS = 'ADD_SONGS'
export const SHOW_PLAYER = 'SHOW_PLAYER'
export const HIDE_PLAYER = 'HIDE_PLAYER'
export const UPDATE_CURRENT_SONG = 'UPDATE_CURRENT_SONG'
export const ADD_LOCATION = 'ADD_LOCATION'
export const REMOVE_LOCATION = 'REMOVE_LOCATION'
export const CLEAR_LOCATIONS = 'CLEAR_LOCATIONS'
export const LOAD_DISTANCES = 'LOAD_DISTANCES'
export const UPDATE_DISTANCE_OPTIONS = 'UPDATE_DISTANCE_OPTIONS'
export const SAVE_ORIGIN = 'SAVE_ORIGIN'

export function saveOrigin(location) {
  return {type: SAVE_ORIGIN, location}
}

export function addLocation(location) {
  return {type: ADD_LOCATION, location}
}

export function removeLocation(index) {
  return {type: REMOVE_LOCATION, index}
}

export function clearLocations() {
  return {type: CLEAR_LOCATIONS}
}

export function updateDistanceOptions(options) {
  return {type: UPDATE_DISTANCE_OPTIONS, options}
}

export function loadDistances(distances) {
  return {type: LOAD_DISTANCES, distances}
}

export function closeFile() {
  return {type: CLOSE_FILE}
}

export function showPlayer() {
  return { type: SHOW_PLAYER}
}

export function hidePlayer() {
  return { type: HIDE_PLAYER}
}

export function loadPlaylist(playlist) {
  return { type: LOAD_PLAYLIST, playlist}
}
export function addSongs(newSongs) {
  return {type: ADD_SONGS, newSongs}
}

export function updateCurrentSong(index) {
  return { type: UPDATE_CURRENT_SONG, index}
}

export function loadFile(fileContent) {
  return { type: LOAD_FILE, fileContent}
}

export function changeText(text) {
  return { type: CHANGE_TEXT, text}
}
