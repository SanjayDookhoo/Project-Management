import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeEdit, changeDelete, changeOption } from '../actions/rootActions'

class Option extends Component {
  // componentDidUpdate = () => {
  //   console.log("Option.js update")
  // }

  //redirects from projects page, to risks page related to that project
  handleStartManagementClick = () => { 
    this.props.history.push('/project/risks')
  }

  handleEditorCreate = () => {
    const { category, depth, changeOption_, changeEdit_ } = this.props

    changeOption_(category, depth, false)  // closes option
    changeEdit_(category, depth, true) // opens edit
  }

  handleDelete = () => {
    const { category, depth, changeOption_, changeDelete_ } = this.props

    changeOption_(category, depth, false) // closes option
    changeDelete_(category, depth, true) // opens delete
  }

  render() {
    const { category, depth } = this.props

    const { selected, option } = this.props

    const createNew = (
      <div className="row">
        <div className="col s12 fwbtn">
          <button className="waves-effect waves-light btn" onClick={this.handleEditorCreate}><i className="material-icons left">add</i>Create New {depth !== 1 ? 'Nested Action' : category}</button>
        </div>
      </div>
    )

    if (option && category !== 'Project'){
      if(selected === -1){
        return createNew
      }else{
        return ( 
          <div className="row">
            <div className="col s6 fwbtn">
              <button className="waves-effect waves-light btn" onClick={this.handleEditorCreate}><i className="material-icons left">edit</i>Edit {depth !== 1 ? 'Nested Action' : category}</button>
            </div>
            <div className="col s6 fwbtn">
              <button className="waves-effect waves-light btn" onClick={this.handleDelete}><i className="material-icons left">delete</i>Delete {depth !== 1 ? 'Nested Action' : category}</button>
            </div>
          </div>
        )
      }
    }else if(option && category === 'Project'){
      if(selected === -1){
        return createNew
      }else{
        return ( 
          <div className="row">
            <div className="col s4 fwbtn">
              <button className="waves-effect waves-light btn" onClick={this.handleEditorCreate}><i className="material-icons left">edit</i>Edit {depth !== 1 ? 'Nested Action' : category}</button>
            </div>
            <div className="col s4 fwbtn">
              <button className="waves-effect waves-light btn" onClick={this.handleDelete}><i className="material-icons left">delete</i>Delete {depth !== 1 ? 'Nested Action' : category}</button>
            </div>
            <div className="col s4 fwbtn">
              <button className="waves-effect waves-light btn" onClick={this.handleStartManagementClick}><i className="material-icons left">insert_chart</i>Start Management</button>
            </div>
          </div>
        )
      }
    }else{
      return (
        null
      )
    }
    
  }
}

const mapStateToProps = (state, ownProps) => {
  const { category, depth } = ownProps
  return {
    option: state[category].find(cat => cat.depth === depth).option,
    selected: state[category].find(cat => cat.depth === depth).selected,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeOption_: (category, depth, value) => { dispatch(changeOption(category, depth, value)) },
    changeDelete_: (category, depth, value) => { dispatch(changeDelete(category, depth, value)) },
    changeEdit_: (category, depth, value) => { dispatch(changeEdit(category, depth, value)) },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Option));
