import React, { Component } from 'react';
import axios from 'axios'

class EditProject extends Component {
  state = {
    name: '',
    description: '',
    status: 0
  }
  
  componentDidMount = () => {
    if(this.props.project){
      const { name, description, status } = this.props.project

      this.setState({
        name,
        description,
        status
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSave = (e) => {
    e.preventDefault();

    const { name, description, status} = this.state
    let self = this //The callback in the axios function is called not from within your function, so the 'this' is not pointing to what you expect, i.e., your class.

    if(self.props.project){ //it will be a update
      axios.put(process.env.REACT_APP_API_URL + '/project', {
        id: self.props.project.id,
        name,
        description,
        status
      })
      .then(function (response) {
        if(response.status == 200){
          self.props.closeEdit(response.data)
        }
      })
    }else{ //it will be create
      axios.post(process.env.REACT_APP_API_URL + '/project', {
        name,
        description,
        status
      })
      .then(function (response) {
        if(response.status == 200){
          self.props.closeEdit(response.data)
        }
      })
    }
    
  }

  handleCancel = () => {
    this.props.closeEdit('cancelled')
  }

  render() {
    const { name, description, status } = this.state
    
    return(
      <div className="post card"> 
        <form onSubmit={this.handleSave}>
          <div className="card-content"> 
            <div className="input-field">
              <input id="name" type="text" className="validate" value={name} onChange={this.handleChange}/>
              <label htmlFor="name" className="active">Name</label>
            </div>
            <div className="input-field">
              <input id="description" type="text" className="validate" value={description} onChange={this.handleChange}/>
              <label htmlFor="description" className="active">Description</label>
            </div>
            <div className="input-field">
              <input id="status" type="number" min="0" max="100" className="validate" value={status} onChange={this.handleChange}/>
              <label htmlFor="status" className="active">Status</label>
            </div>
            
            <div className="row">
              <div className="col s6 fwbtn">
                {/* if updating or creating a new, the final confirmation button will be a reflection of the task being done */}
                { this.props.project ? (
                    <button className="waves-effect waves-light btn" type="submit" name="action"><i className="material-icons left">save</i>Save</button>
                  ) : (
                    <button className="waves-effect waves-light btn" type="submit" name="action"><i className="material-icons left">create</i>Create</button>
                  )
                }
              </div>
              <div className="col s6 fwbtn">
                <a className="waves-effect waves-light btn" onClick={this.handleCancel}><i className="material-icons left">cancel</i>Cancel</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default EditProject;
