import React, { Component } from 'react';
import axios from 'axios'

class ViewProjects extends Component {
  state = {
    projects: [],
    selected: -1
  }
  
  componentDidMount = () => {
    let self = this //The callback in the axios function is called not from within your function, so the 'this' is not pointing to what you expect, i.e., your class.

    axios.get(process.env.REACT_APP_API_URL + '/projects', {})
    .then(function (response) {
      if(response.status == 200){
        self.setState({
          projects: response.data
        })
      }
    })
  }

  handleEditClick = (id) => {
    this.setState({
      selected: id
    })
  }

  handleCreateClick = () => {
    console.log("create")
  }

  renderTableData() {
    return this.state.projects.map((project, index) => {
       const { id, name, description, status } = project
       return (
          <tr key={id} onClick={() => this.handleEditClick(id)}>
             <td>{name}</td>
             <td>{description}</td>
             <td> <div className="center"> {status} % </div>
              <div className="progress">
                  <div className="determinate" style={{width: + status + '%'}}></div>
              </div>
             </td>
          </tr>
       )
    })
  }

  render() {
    let ret=null;
    let selected = this.state.selected;
    let projects = this.state.projects;

    if(selected != -1){
      ret = (
        <div className="post card"> 
          <div className="card-content"> 
            <h5> {projects.find(project => project.id == selected).name} </h5>
          </div>
        </div>
      )
    }else{
      ret = this.state.projects.length ? (
        <div className="post card"> 
          <div className="card-content"> 
            <table className="highlight" >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderTableData()}
                </tbody>
            </table>
          </div>
          <div className="card-action">
            <div className="center">
              <a className="waves-effect waves-light btn" onClick={this.handleCreateClick}><i className="material-icons left">add</i>Create New</a>
            </div>
          </div>
        </div>
      ) : (
        <div className="post card"> 
          <div className="card-content"> 
            No Projects 
          </div>
        </div>
      )
    }
    
    return ret
  }
}

export default ViewProjects;
