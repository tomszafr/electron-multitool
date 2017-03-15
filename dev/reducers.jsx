import { combineReducers } from 'redux'
import { LOAD_FILE, CHANGE_TEXT } from './actions.jsx'

function fileContent (state = {}, action) {
  console.log(state)
  switch (action.type) {
    case LOAD_FILE:
      return Object.assign({}, state.fileContent, action.fileContent)
    case CHANGE_TEXT:
      let newFileContent = {
        text: action.text
      }
      console.log(state)
      console.log(action);
      return Object.assign({}, state.fileContent, newFileContent)
    default:
      return state
  }
}
const theAppStore = combineReducers({
  fileContent
})

export default theAppStore
