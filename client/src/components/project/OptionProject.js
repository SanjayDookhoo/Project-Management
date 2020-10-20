import React, { Component } from 'react';

class OptionProject extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.selected === nextProps.selected &&
      this.props.isVisible === nextProps.isVisible){
      return false;
    } else {
      return true;
    }
  }
  
  componentDidUpdate = () => {
    console.log(new Date().toLocaleTimeString(),"OptionProject.js update")
  }

  render() {
    const { selected, isVisible, handleEditOrCreateClick, handleDeleteClick, handleStartManagementClick } = this.props

    let options = null
    if (selected !== -1 && isVisible === true){
      options = (
        <div className="post card">
          <div className="card-content">
            <div className="row">
              <div className="col s4 fwbtn">
                <a className="waves-effect waves-light btn" onClick={handleEditOrCreateClick}><i className="material-icons left">edit</i>Edit</a>
              </div>
              <div className="col s4 fwbtn">
                <a className="waves-effect waves-light btn" onClick={() => handleDeleteClick(selected)}><i className="material-icons left">delete</i>Delete</a>
              </div>
              <div className="col s4 fwbtn">
                <a className="waves-effect waves-light btn" onClick={handleStartManagementClick}><i className="material-icons left">insert_chart</i>Start Management</a>
              </div>
            </div>
          </div>
        </div>
      )
    }else if (selected === -1 && isVisible === true){
      options = (
        <div className="post card">
          <div className="card-content">
            <div className="row">
              <div className="col s12 fwbtn">
                <a className="waves-effect waves-light btn" onClick={handleEditOrCreateClick}><i className="material-icons left">add</i>Create New</a>
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

export default OptionProject;
