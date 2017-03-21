import Distances from './../components/Distances.jsx'
import { connect } from 'react-redux'
import { addLocation, loadDistances, saveOrigin, updateDistanceOptions } from './../actions.jsx'

const mapStateToProps = (state) => {
  return {
    locations: state.distCalculator.locations,
    distances: state.distCalculator.distances,
    origin: state.distCalculator.origin,
    distanceOptions: state.distCalculator.distanceOptions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddLocation: (location) => {
      dispatch(addLocation(location))
    },
    onCalculateDistances: (distances) => {
      dispatch(loadDistances(distances))
    },
    onSaveOrigin: (location) => {
      dispatch(saveOrigin(location))
    },
    onUpdateDistanceOptions: (options) => {
      dispatch(updateDistanceOptions(options))
    }
  }
}

const LocationDistances = connect(
  mapStateToProps,
  mapDispatchToProps
)(Distances)

export default LocationDistances
