import Spinner from './../components/Spinner.jsx'
import { connect } from 'react-redux'
import { showSpinner, hideSpinner } from './../actions.jsx'

const mapStateToProps = (state) => {
  return {
    spinner: state.spinner
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const SpinnerVisibility = connect(
  mapStateToProps,
  mapDispatchToProps
)(Spinner)

export default SpinnerVisibility
