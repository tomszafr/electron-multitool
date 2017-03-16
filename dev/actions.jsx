export const LOAD_FILE = 'LOAD_FILE'
export const CLOSE_FILE = 'CLOSE_FILE'
export const CHANGE_TEXT = 'CHANGE_TEXT'

export function closeFile() {
  return {type: CLOSE_FILE}
}

export function loadFile(fileContent) {
  return { type: LOAD_FILE, fileContent}
}

export function changeText(text) {
  return { type: CHANGE_TEXT, text}
}
