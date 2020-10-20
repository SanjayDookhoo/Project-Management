import React, { Component } from 'react';
import axios from 'axios'
import Edit from './Edit';
import Option from './Option';
import View from './View';


class Level extends Component {
  state = {
    records: [],
    selected: -1,
    editOrCreate: false
  }
  
  componentDidMount = () => {
    let self = this //The callback in the axios function is called not from within your function, so the 'this' is not pointing to what you expect, i.e., your class.
    if(this.props.category !== 'Project'){
      axios.get(`${process.env.REACT_APP_API_URL}/${this.props.category}s_from_project`, {
        params: {
          project_id: this.props.projectFilter
        }
      })
      .then(function (response) {
        if(response.status === 200){
          self.setState({
            records: response.data
          })
        }
      })
    }else{
      axios.get(`${process.env.REACT_APP_API_URL}/${this.props.category}s`, {})
      .then(function (response) {
        if(response.status === 200){
          self.setState({
            records: response.data
          })
        }
      })
    }
    
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

  closeEditOrCreate = (rec) => {
    if(rec!=='cancelled'){
      if (this.state.records.find(record => record.id === rec.id)){ //was a update
        const newRecords = this.state.records.filter(record => record.id !== rec.id)

        this.setState({
          editOrCreate: false,
          records: [...newRecords,rec]
        })
      }else{//was new
        this.setState({
          editOrCreate: false,
          records: [...this.state.records,rec]
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
          records: self.state.records.filter(record => record.id !== id),
          selected: -1
        })
      }
    })
  }

  render() {
    return (
      <div>
        <View
          category = {this.props.category} 
          color = {this.props.color} 

          selected = {this.state.selected} 
          records = {this.state.records} 
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
          
          project = { this.state.selected === -1 ? null : this.state.records.find(record => record.id === this.state.selected) } 
          ifCreate = {this.state.selected === -1 ? true : false}
          isVisible = {this.state.editOrCreate} 
          closeEditOrCreate = {this.closeEditOrCreate} 
        />
      </div>
    )
  }
}

export default Level;

