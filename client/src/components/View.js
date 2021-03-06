import React, { Component} from 'react';
import { connect } from 'react-redux'
import { changeSelected } from '../actions/rootActions'
import { statusField } from '../helperFunctions/mainHelper'

class View extends Component {
  // shouldComponentUpdate = (nextProps, nextState) => {
  //   return true
  // }

  // componentDidUpdate = () => {
  //   console.log("View.js update")
  // }

  handleFocus = (id) => {
    const { category, depth, records } = this.props
    const { changeSelected_ } = this.props
    let recordToEdit = records.find(rec => rec.id === id) //finds record for passing to a dispatch, so the record can be stored in redux for later retrieval
    let nestedAction_id = null

    //because of how it is to create relationships in the database to an eventual self referencing table, this is necessary to create the link frontend
    if(depth === 1){
      nestedAction_id = records.find(rec => rec.id === id).nestedAction_id
    }else{
      nestedAction_id = id
    }
    
    changeSelected_(category, depth, id, nestedAction_id, recordToEdit)
  }

  handleUnfocus = () => {
    const { category, depth } = this.props
    const { changeSelected_ } = this.props

    changeSelected_(category, depth, -1)
  }

  renderTableData() {
    return this.props.records.sort((a, b) => a.id - b.id).map((project, index) => {
       const { id, name, description, budget, status, assigned_to, dueTimestamp, createdTimestamp } = project

       return (
          <tr className="hoverable" key={id} onClick={() => this.handleFocus(id)}>
             <td>{name}</td>
             <td>{description}</td>
             <td>{budget}</td>
             <td> <div className="center"> {status} % </div>
              <div className="progress">
                  <div className="determinate" style={{width: + status + '%'}}></div> 
              </div>
             </td>
             <td>{assigned_to}</td>
             <td>{dueTimestamp === '0001-01-01T01:01:00' ? '' : new Date(dueTimestamp).toLocaleString()}</td>
             <td>{new Date(createdTimestamp).toLocaleString()}</td>
          </tr>
       )
    })
  }

  render() {
    let view = null

    const { color, category, depth , selected, records } = this.props
    
    if(selected !== -1){
      const recordName = records.find(project => project.id === selected).name //current selected record

      view = (
        <div>
          <div className={`post card white-text ${color}`}> 
            <div className="card-content" onClick={this.handleUnfocus}> 
              <div className={`post card white-text ${color} hoverable`}> 
                <div className="card-content">
                  <h5> <b>Selected: </b> {recordName} </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }else{
      view = this.props.records.length ? (
        <div>
          <div className={`post card white-text ${color}`}> 
            <div className="card-content"> 
              <table >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Budget</th>
                      <th> {statusField(category, depth)}% </th>
                      <th>Assigned To</th>
                      <th>Due Date</th>
                      <th>Created Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderTableData()}
                  </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* if no information has been stored in the records state yet, alert user */}
          <div className={`post card white-text ${color}`}> 
            <div className="card-content"> 
              No {`${depth >= 2 ? 'Nested Action' : category}s`}
            </div>
          </div>
        </div>
      )
    }
    
    return view
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selected: state[ownProps.category].find(cat => cat.depth === ownProps.depth).selected, // selected item in this instance of view component
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeSelected_: (category, depth, value, nestedAction_id, recordToEdit) => { dispatch(changeSelected(category, depth, value, nestedAction_id, recordToEdit)) },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(View);
