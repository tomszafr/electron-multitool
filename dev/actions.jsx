export const LOAD_FILE = 'LOAD_FILE'
export const CLOSE_FILE = 'CLOSE_FILE'
export const CHANGE_TEXT = 'CHANGE_TEXT'
export const LOAD_PLAYLIST = 'LOAD_PLAYLIST'
export const ADD_SONGS = 'ADD_SONGS'
export const SHOW_PLAYER = 'SHOW_PLAYER'
export const HIDE_PLAYER = 'HIDE_PLAYER'
export const SHOW_SPINNER = 'SHOW_SPINNER'
export const HIDE_SPINNER = 'HIDE_SPINNER'
export const UPDATE_CURRENT_SONG = 'UPDATE_CURRENT_SONG'

export function closeFile() {
  return {type: CLOSE_FILE}
}

export function showPlayer() {
  return { type: SHOW_PLAYER}
}

export function hidePlayer() {
  return { type: HIDE_PLAYER}
}

export function hideSpinner() {
  return { type: HIDE_SPINNER}
}

export function showSpinner() {
  return { type: SHOW_SPINNER}
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
