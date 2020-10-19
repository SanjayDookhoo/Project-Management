import React, { Component } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import EditProject from './EditProject';

class ViewProjects extends Component {
  state = {
    projects: [],
    selected: -1,
    edit: false,
    create: false
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

  handleModifyClick = (id) => {
    this.setState({
      selected: id
    })
  }

  handleEditClick = (id) => {
    this.setState({
      edit: true
    })
  }

  handleCreateClick = () => {
    this.setState({
      create: true
    })
  }

  closeEdit = (rec_project) => {
    if (this.state.projects.find(project => project.id == rec_project.id)){ //was a update
      const newProjects = this.state.projects.filter(project => project.id != rec_project.id)

      this.setState({
        edit: false,
        projects: [...newProjects,rec_project]
      })
    }else{//was new
      this.setState({
        edit: false,
        projects: [...this.state.projects,rec_project]
      })
    }
    
  }

  handleDeleteClick = (id) => {
    let self = this //The callback in the axios function is called not from within your function, so the 'this' is not pointing to what you expect, i.e., your class.

    axios.delete(process.env.REACT_APP_API_URL + '/project', {
      params: {
        id
      }
    })
    .then(function (response) {
      if(response.status == 200){
        self.setState({
          projects: self.state.projects.filter(project => project.id != id),
          selected: -1
        })
      }
    })
  }

  handleStartManagementClick = (id) => {
    this.props.history.push('/project/risks')

    /*need to set project selected in redux */
  }

  renderTableData() {
    return this.state.projects.map((project, index) => {
       const { id, name, description, status } = project
       return (
          <tr key={id} onClick={() => this.handleModifyClick(id)}>
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

    const editComponent = this.state.edit ? <EditProject project={this.state.projects.find(project => project.id==this.state.selected)} closeEdit={this.closeEdit}/> : null
    const createComponent = this.state.create ? <EditProject closeEdit={this.closeEdit}/> : null

    if(selected != -1){
      ret = (
        <div>
          <div className="post card"> 
            <div className="card-content"> 
              <h5> {projects.find(project => project.id == selected).name} </h5>
            </div>
            <div className="card-action">
              <a className="waves-effect waves-light btn green" onClick={() => this.handleEditClick(selected)}><i className="material-icons left">edit</i>Edit</a>
              <a className="waves-effect waves-light btn red" onClick={() => this.handleDeleteClick(selected)}><i className="material-icons left">delete</i>Delete</a>
              <a className="waves-effect waves-light btn blue" onClick={() => this.handleStartManagementClick(selected)}><i className="material-icons left">insert_chart</i>Start Management</a>
            </div>
          </div>
          {editComponent}
        </div>
      )
    }else{
      ret = this.state.projects.length ? (
        <div>
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
          {createComponent}
        </div>
      ) : (
        <div>
          <div className="post card"> 
            <div className="card-content"> 
              No Projects 
            </div>
          </div>
          {createComponent}
        </div>
      )
    }
    
    return ret
  }
}

export default withRouter( ViewProjects );
