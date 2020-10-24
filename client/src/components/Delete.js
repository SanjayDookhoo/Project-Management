import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeDelete } from '../actions/rootActions'

class Delete extends Component {
  // componentDidUpdate = () => {
  //   console.log("delete.js update")
  // }

  handleDelete = () => {
    const { category, depth, handleDeleteRecord } = this.props
    const { selected, changeDelete_ } = this.props
    changeDelete_(category, depth, false, true) // close delete component and propagate necessary change (wont be able to see nested items anymore)
    handleDeleteRecord(selected) // function passed from parent to handle deleting
  }

  handleCancel = () => {
    const { category, depth } = this.props
    const { changeDelete_ } = this.props
    changeDelete_(category, depth, false) // close delete component
  }


  render() {
    const { color } = this.props

    //only renders when this prop changes from redux
    if(this.props.delete){
      return(
        <div className={`post card white-text ${color}`}> 
            <div className="card-content"> 
              <div className="row">
                Are you sure you want to delete? Note: all related records will be lost
              </div>
              
              <div className="row">
              <div className="col s6 fwbtn">
                  <button className="waves-effect waves-light btn" onClick={this.handleDelete}><i className="material-icons left">delete</i>Delete</button>
                </div>
                <div className="col s6 fwbtn">
                  <button className="waves-effect waves-light btn" onClick={this.handleCancel}><i className="material-icons left">cancel</i>Cancel</button>
                </div>
              </div>
            </div>
        </div>
      )
    }else{
      return null
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const { category, depth } = ownProps

  return {
    delete: state[category].find(cat => cat.depth === depth).delete, //if to delete
    selected: state[category].find(cat => cat.depth === depth).selected, //item selected that would be deleted, if to delete
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeDelete_: (category, depth, value, success) => { dispatch(changeDelete(category, depth, value, success)) },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Delete);
