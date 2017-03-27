import React from 'react'
import styles from './Results.scss'
import {createFile} from './../../node-methods/file-operations.jsx'

const Results = React.createClass({
  handleSaveResults: function() {
    let content = ''
    this.props.distances.forEach((el, index) => {
      content += `${index}. ${(el.name !== '') ? el.name : `${el.location.lat}, ${el.location.lng}`} : ${el.distance.text} : ${el.duration.text};\r\n`
    })
    createFile(content)
  },
  render: function () {
    const {distances} = this.props
    let distanceRows
    if (distances[0] && distances[0].status === 'ZERO_RESULTS') {
      distanceRows = [(
        <tr key={'distanceNoResults'}>
          <td colSpan="4">No routes found.</td>
        </tr>
      )]
    } else {
      distanceRows = distances.map((el, index) => {
       return (
         <tr key={'distanceResult' + index}>
           <td>{index}</td><td>{(el.name !== '') ? el.name : `${el.location.lat}, ${el.location.lng}` }</td><td>{el.distance.text}</td><td>{el.duration.text}</td>
         </tr>
       )
      })
    }
    return (
      <div className={styles.outputBox}>
        <h3>Results:</h3>
        <table className={styles.resultsTable}>
          <thead>
            <tr>
              <td>No.</td><td>Location</td><td>Distance</td><td>Duration</td>
            </tr>
          </thead>
          <tbody>
            { distanceRows }
          </tbody>
        </table>
        <button onClick={this.handleSaveResults}>Save results</button>
      </div>
    )
  }
})

export default Results;
