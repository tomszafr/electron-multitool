import { combineReducers } from 'redux'
import { LOAD_FILE, CHANGE_TEXT, CLOSE_FILE } from './actions.jsx'

function fileContent (state = {}, action) {
  switch (action.type) {
    case LOAD_FILE:
      return Object.assign({}, state.fileContent, action.fileContent)
    case CHANGE_TEXT:
      let newFileContent = {
        text: action.text
      }
      return Object.assign({}, state, newFileContent)
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
  fileContent
})

export default theAppStore
