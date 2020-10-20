import React, { Component } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Edit from './Edit';
import Option from './Option';
import View from './View';


class Level extends Component {
  state = {
    projects: [],
    selected: -1,
    editOrCreate: false
  }
  
  componentDidMount = () => {
    let self = this //The callback in the axios function is called not from within your function, so the 'this' is not pointing to what you expect, i.e., your class.
    axios.get(`${process.env.REACT_APP_API_URL}/${this.props.category}s`, {})
    .then(function (response) {
      if(response.status === 200){
        self.setState({
          projects: response.data
        })
      }
    })
  }

  componentDidUpdate = () => {
    console.log(new Date().toLocaleTimeString(),"ContainerProject.js update")
  }

  handleUnfocus = () => {
    this.setState({
      selected: -1,
      editOrCreate: false
    })
  }

  handleFocus = (id) => {
    this.setState({
      selected: id,
      editOrCreate: false
    })
  }

  handleEditOrCreateClick = (id) => {
    this.setState({
      editOrCreate: true
    })
  }

  closeEditOrCreate = (rec_project) => {
    if(rec_project!=='cancelled'){
      if (this.state.projects.find(project => project.id === rec_project.id)){ //was a update
        const newProjects = this.state.projects.filter(project => project.id !== rec_project.id)

        this.setState({
          editOrCreate: false,
          projects: [...newProjects,rec_project]
        })
      }else{//was new
        this.setState({
          editOrCreate: false,
          projects: [...this.state.projects,rec_project]
        })
      }
    }else{
      this.setState({
        editOrCreate: false
      })
    }
  }

  handleDeleteClick = (id) => {
    let self = this //The callback in the axios function is called not from within your function, so the 'this' is not pointing to what you expect, i.e., your class.

    axios.delete(`${process.env.REACT_APP_API_URL}/${this.props.category}`, {
      params: {
        id
      }
    })
    .then(function (response) {
      if(response.status === 200){
        self.setState({
          projects: self.state.projects.filter(project => project.id !== id),
          selected: -1
        })
      }
    })
  }

  handleStartManagementClick = (id) => {
    this.props.history.push('/project/risks')

    /*need to set project selected in redux */
  }

  render() {
    return (
      <div>
        <View
          category = {this.props.category} 
          color = {this.props.color} 

          selected = {this.state.selected} 
          projects = {this.state.projects} 
          handleFocus = {this.handleFocus} 
          handleUnfocus= {this.handleUnfocus} 
        />

        <Option
          category = {this.props.category} 
          color = {this.props.color} 
          
          selected = {this.state.selected}
          isVisible = {!this.state.editOrCreate} 
          handleEditOrCreateClick = {this.handleEditOrCreateClick} 
          handleDeleteClick = {this.handleDeleteClick} 
          handleStartManagementClick = {this.handleStartManagementClick} 
        />

        <Edit
          category = {this.props.category} 
          color = {this.props.color} 
          
          project = { this.state.selected === -1 ? null : this.state.projects.find(project => project.id === this.state.selected) } 
          ifCreate = {this.state.selected === -1 ? true : false}
          isVisible = {this.state.editOrCreate} 
          closeEditOrCreate = {this.closeEditOrCreate} 
        />
      </div>
    )
  }
}

export default withRouter( Level );

