import Notepad from './../components/Notepad.jsx'
import { connect } from 'react-redux'
import { loadFile, changeText, closeFile } from './../actions.jsx'

const mapStateToProps = (state) => {
  return {
    fileContent: state.fileContent
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadFile: (fileContent) => {
      dispatch(loadFile(fileContent))
    },
    onCloseFile: () => {
      dispatch(closeFile())
    },
    onChangeText: (text) => {
      dispatch(changeText(text))
    }
  }
}

const LoadedNotepad = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notepad)

export default LoadedNotepad
