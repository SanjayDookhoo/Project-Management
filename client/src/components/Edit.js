import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeEdit, changeOption } from '../actions/rootActions'
import { statusField } from '../helperFunctions/mainHelper'

class Edit extends Component {
  componentDidUpdate = (prevProps, prevState) => {
    // console.log("Edit.js update")
    const { modifyOrCreate, recordToEdit, edit } = this.props
    
    //when edit state is true and a item is selected, so modify is implied. this.state === prevState prevents the stack from overflowing everytime the state changes
    if(edit && this.state === prevState && modifyOrCreate === 'modify' ){
      // console.log("Edit.js update, expect another update, setting state in componentDidUpdate for Modify")
      const { id, name, description, budget, status, assigned_to, dueTimestamp } = recordToEdit
      const dueTimestampSplit = dueTimestamp.split(':')
      
      this.setState({
        id,
        name,
        description,
        budget,
        status,
        assigned_to,
        dueTimestamp:  dueTimestamp==='0001-01-01T01:01:00' ? '' : dueTimestampSplit[0] + ':' + dueTimestampSplit[1]
      })
    }
    //when edit state is true and a item is not selected, so create is implied. this.state === prevState prevents the stack from overflowing everytime the state changes
    if(edit && this.state === prevState && modifyOrCreate === 'create' ){
      // console.log("Edit.js update, expect another update, setting state in componentDidUpdate for Create")
      this.setState({
        name: '',
        description: '',
        budget: 0,
        status: 0,
        assigned_to: '',
        dueTimestamp: '',
      })
    }
  }

  state = {
    name: '',
    description: '',
    budget: 0,
    status: 0,
    assigned_to: '',
    dueTimestamp: '',
  }

  //targets state  based on the trigger of the value change event
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
    
    //if a new category element was created, and the user proceeds to enter another in the same category without doing anything else, the state would not have changed to allow resetting of state to default, therefore this is to counter that issue
    this.setState({
      name: '',
      description: '',
      budget: 0,
      status: 0,
      assigned_to: 0,
      dueTimestamp: '',
    })
  }

  handleCancel = () => {
    const { depth, category } = this.props
    const { changeEdit_, changeOption_ } = this.props
    
    changeEdit_(category, depth, false)
    changeOption_(category, depth, true)
  }

  render() {
    const { name, description, budget, status, assigned_to, dueTimestamp } = this.state
    const { color, category, depth, modifyOrCreate } = this.props
    const { edit } = this.props

    if(edit){
      return(
        <div className={`post card white-text ${color}`}> 
           <form onSubmit={this.handleSave}>  {/* used becuase enter key coutns as a submit, etc. */}
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
                <input id="budget" type="number" className="validate white-text" value={budget} onChange={this.handleChange}/>
                <label htmlFor="budget" className="active">Budget</label>
              </div>
              <div className="input-field">
                <input id="status" type="number" min="0" max="100" className="validate white-text" value={status} onChange={this.handleChange}/>
                <label htmlFor="status" className="active">{statusField(category, depth)} (%)</label>
              </div>
              <div className="input-field">
                <input id="assigned_to" type="text" className="validate white-text" value={assigned_to} onChange={this.handleChange}/>
                <label htmlFor="assigned_to" className="active">Assigned To</label>
              </div>
              <div className="input-field">
                <input id="dueTimestamp" type="datetime-local" className="validate white-text" value={dueTimestamp} onChange={this.handleChange}/>
                <label htmlFor="dueTimestamp" className="active">Due Date</label>
              </div>
              
              <div className="row">
                <div className="col s6 fwbtn">
                  {/* if updating or creating a new, the final confirmation button will be a reflection of the task being done */}
                  { this.props.project ? (
                      <button className="waves-effect waves-light btn" type="submit" name="action"><i className="material-icons left">save</i>Save {depth !== 1 ? 'Nested Action' : category}</button>
                    ) : (
                      <button className="waves-effect waves-light btn" type="submit" name="action"><i className="material-icons left">create</i> {modifyOrCreate === 'modify' ? 'Save' : 'Create'} {depth !== 1 ? 'Nested Action' : category}</button>
                    )
                  }
                </div>
                <div className="col s6 fwbtn">
                  <button className="waves-effect waves-light btn" onClick={this.handleCancel}><i className="material-icons left">cancel</i>Cancel</button>
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
    edit: state[category].find(cat => cat.depth === depth).edit, // is it time to edit right now
    modifyOrCreate: state[category].find(cat => cat.depth === depth).selected !== -1 ? 'modify' : 'create', //if it is a modify or create
    recordToEdit: state[category].find(cat => cat.depth === depth).recordToEdit //record to edit that is stored in redux
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeEdit_: (category, depth, value) => { dispatch(changeEdit(category, depth, value)) },
    changeOption_: (category, depth, value) => { dispatch(changeOption(category, depth, value)) },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Edit);
