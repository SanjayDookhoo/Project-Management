import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeEdit, changeOption } from '../actions/rootActions'

class Edit extends Component {
  componentDidUpdate = (prevProps) => {
    console.log(new Date().toLocaleTimeString(),"Edit.js update")

    if(this.props.record != prevProps.record){
      if(this.props.record){
        const { name, description, status } = this.props.record
  
        this.setState({
          name,
          description,
          status
        })
      }
    }
  }

  state = {
    name: '',
    description: '',
    status: 0,

  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSave = (e) => {
    e.preventDefault();
    const { category, depth, handleModifyRecord, handleNewRecord } = this.props
    const { modifyOrCreate, changeEdit_, changeOption_ } = this.props

    if(modifyOrCreate === 'modify'){
      changeEdit_(category, depth, false)
      changeOption_(category, depth, true)
      handleModifyRecord(this.state)
    }else{
      changeEdit_(category, depth, false)
      changeOption_(category, depth, true)
      handleNewRecord(this.state)
    }
  }

  handleCancel = () => {
    const { depth, category } = this.props
    const { changeEdit_, changeOption_ } = this.props
    
    changeEdit_(category, depth, false)
    changeOption_(category, depth, true)
  }

  render() {
    const { name, description, status } = this.state
    const { color, category, depth, editOrModify } = this.props
    const { edit } = this.props

    if(edit){
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
                      <button className="waves-effect waves-light btn" type="submit" name="action"><i className="material-icons left">save</i>Save {depth !== 1 ? 'Nested Action' : category}</button>
                    ) : (
                      <button className="waves-effect waves-light btn" type="submit" name="action"><i className="material-icons left">create</i> {editOrModify === 'modify' ? 'Edit' : 'Create'} {depth !== 1 ? 'Nested Action' : category}</button>
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
  const { category, depth } = ownProps

  return {
    edit: state[category].find(cat => cat.depth === depth).edit,
    editOrModify: state[category].find(cat => cat.depth === depth).selected !== -1 ? 'modify' : 'create',
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeEdit_: (category, depth, value) => { dispatch(changeEdit(category, depth, value)) },
    changeOption_: (category, depth, value) => { dispatch(changeOption(category, depth, value)) },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Edit);
