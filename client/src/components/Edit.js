import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'

class Edit extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.record !== nextProps.record
      || this.props.ifCreate !== nextProps.ifCreate
      || this.props.isVisible !== nextProps.isVisible){


        this.setState({
          name: this.props.record ? this.props.record.name : '',
          description: this.props.record ? this.props.record.description : '',
          status: this.props.record ? this.props.record.status : 0
        })

      return true;
    }

    if(this.props.state != nextState){
        return true;
    }

    return false;
  }

  componentDidUpdate = () => {
    console.log(new Date().toLocaleTimeString(),"Edit.js update")
  }

  state = {
    name: '',
    description: '',
    status: 0
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSaveProject = (e) => {
    const { name, description, status} = this.state
    let self = this //The callback in the axios function is called not from within your function, so the 'this' is not pointing to what you expect, i.e., your class.

    if(self.props.record){ //it will be a update
      axios.put(`${process.env.REACT_APP_API_URL}/${this.props.category}`, {
        id: self.props.record.id,
        name,
        description,
        status
      })
      .then(function (response) {
        if(response.status === 200){
          self.props.closeEditOrCreate(response.data)
        }
      })
    }else{ //it will be create
      axios.post(`${process.env.REACT_APP_API_URL}/${this.props.category}`, {
        name,
        description,
        status
      })
      .then(function (response) {
        if(response.status === 200){
          self.props.closeEditOrCreate(response.data)
        }
      })
    }
  }

  handleSaveNestedAction = (e) => {
    const { name, description, status} = this.state
    let self = this //The callback in the axios function is called not from within your function, so the 'this' is not pointing to what you expect, i.e., your class.

    if(self.props.record){ //it will be a update
      axios.put(`${process.env.REACT_APP_API_URL}/${this.props.category}`, {
        id: self.props.record.id,
        name,
        description,
        status,
        parent_id: this.props.parent_id
      })
      .then(function (response) {
        if(response.status === 200){
          self.props.closeEditOrCreate(response.data)
        }
      })
    }else{ //it will be create
      axios.post(`${process.env.REACT_APP_API_URL}/${this.props.category}`, {
        name,
        description,
        status,
        parent_id: this.props.parent_id
      })
      .then(function (response) {
        if(response.status === 200){
          self.props.closeEditOrCreate(response.data)
        }
      })
    }
  }

  handleSaveOther = (e) => {
    const { name, description, status} = this.state
    let self = this //The callback in the axios function is called not from within your function, so the 'this' is not pointing to what you expect, i.e., your class.

    if(self.props.project){ //it will be a update
      axios.put(`${process.env.REACT_APP_API_URL}/${this.props.category}`, {
        id: self.props.record.id,
        name,
        description,
        status,
        project_id: self.props.projectSelected
      })
      .then(function (response) {
        if(response.status === 200){
          self.props.closeEditOrCreate(response.data)
        }
      })
    }else{ //it will be create
      axios.post(`${process.env.REACT_APP_API_URL}/${this.props.category}`, {
        name,
        description,
        status,
        project_id: self.props.projectSelected
      })
      .then(function (response) {
        if(response.status === 200){
          self.props.closeEditOrCreate(response.data)
        }
      })
    }
  }

  handleSave = (e) => {
    e.preventDefault();

    if(this.props.category === 'Project'){
      this.handleSaveProject(e)
    }else if(this.props.category === 'NestedAction'){
      this.handleSaveNestedAction(e)
    }else{
      this.handleSaveOther(e)
    }

    
  }

  handleCancel = () => {
    this.props.closeEditOrCreate('cancelled')
  }

  render() {
    const { name, description, status } = this.state
    const { color, category } = this.props

    if(this.props.isVisible === true){
      return(
        <div className={`post card white-text ${color}`}> 
          <form onSubmit={this.handleSave}>
            <div className="card-content"> 
              <div className="input-field">
                <input id="name" type="text" className="validate white-text" value={name} onChange={this.handleChange}/>
                <label htmlFor="name" className="active">Name</label>
              </div>
              <div className="input-field">
                <input id="description" type="text" className="validate white-text" value={description} onChange={this.handleChange}/>
                <label htmlFor="description" className="active">Description</label>
              </div>
              <div className="input-field">
                <input id="status" type="number" min="0" max="100" className="validate white-text" value={status} onChange={this.handleChange}/>
                <label htmlFor="status" className="active">Status</label>
              </div>
              
              <div className="row">
                <div className="col s6 fwbtn">
                  {/* if updating or creating a new, the final confirmation button will be a reflection of the task being done */}
                  { this.props.project ? (
                      <button className="waves-effect waves-light btn" type="submit" name="action"><i className="material-icons left">save</i>Save {category === 'NestedAction' ? 'Nested Action' : category}</button>
                    ) : (
                      <button className="waves-effect waves-light btn" type="submit" name="action"><i className="material-icons left">create</i>Create {category === 'NestedAction' ? 'Nested Action' : category}</button>
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
    }else{
      return null
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state[ownProps.origin].nestedActions.reverse())
  return {
    projectSelected: state.Project.selected,
    parent_id: ownProps.category === 'NestedAction' ? state[ownProps.origin].nestedActions.reverse()[0].id : null
  }
}

export default connect(mapStateToProps)(Edit);
