import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectProject } from '../actions/rootActions'

class Option extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.selected === nextProps.selected &&
      this.props.isVisible === nextProps.isVisible){
      return false;
    } else {
      return true;
    }
  }
  
  componentDidUpdate = () => {
    console.log(new Date().toLocaleTimeString(),"Option.js update")
  }

  handleStartManagementClick = () => {
    this.props.history.push('/project/risks')

    this.props.selectProject(1)
  }

  render() {
    const { color, category, selected, isVisible, handleEditOrCreateClick, handleDeleteClick,} = this.props

    let options = null

    const buttonLayout = category === 'Project' ? ( 
      <div className="row">
        <div className="col s4 fwbtn">
          <a className="waves-effect waves-light btn" onClick={handleEditOrCreateClick}><i className="material-icons left">edit</i>Edit {category === 'NestedAction' ? 'Nested Action' : category}</a>
        </div>
        <div className="col s4 fwbtn">
          <a className="waves-effect waves-light btn" onClick={() => handleDeleteClick(selected)}><i className="material-icons left">delete</i>Delete {category === 'NestedAction' ? 'Nested Action' : category}</a>
        </div>
        <div className="col s4 fwbtn">
          <a className="waves-effect waves-light btn" onClick={this.handleStartManagementClick}><i className="material-icons left">insert_chart</i>Start Management</a>
        </div>
      </div>
    ) : ( 
      <div className="row">
        <div className="col s6 fwbtn">
          <a className="waves-effect waves-light btn" onClick={handleEditOrCreateClick}><i className="material-icons left">edit</i>Edit {category === 'NestedAction' ? 'Nested Action' : category}</a>
        </div>
        <div className="col s6 fwbtn">
          <a className="waves-effect waves-light btn" onClick={() => handleDeleteClick(selected)}><i className="material-icons left">delete</i>Delete {category === 'NestedAction' ? 'Nested Action' : category}</a>
        </div>
      </div>
    )

    if (selected !== -1 && isVisible === true){
      options = (
        <div className={`post card white-text ${color}`}>
          <div className="card-content">
              {buttonLayout}
          </div>
        </div>
      )
    }else if (selected === -1 && isVisible === true){
      options = (
        <div className={`post card white-text ${color}`}>
          <div className="card-content">
            <div className="row">
              <div className="col s12 fwbtn">
                <a className="waves-effect waves-light btn" onClick={handleEditOrCreateClick}><i className="material-icons left">add</i>Create New {category === 'NestedAction' ? 'Nested Action' : category}</a>
              </div>
            </div>
          </div>
        </div>
      )
    }else if (selected !== -1 && isVisible === false){
      options = ( null )
    }else if (selected === -1 && isVisible === false){
      options = ( null )
    }

    return options
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectProject: (id) => {dispatch(selectProject(id))}
  }
}

export default connect(mapDispatchToProps)(withRouter(Option));
