import React, { Component } from 'react';
import axios from 'axios'
import Edit from './Edit';
import Option from './Option';
import View from './View';
import Delete from './Delete';
import { connect } from 'react-redux'


class Depth extends Component {
  state = {
    records: [],
    dataRetrieved: false
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    //already got the records, no need to update again
    if(nextState.records !== this.state.records){ 
      return true
    }

    //already got the records, no need to update again
    if(nextState.dataRetrieved === true && this.state.dataRetrieved === true){ 
      return false
    }

    //first time getting the records
    if(nextState.dataRetrieved === true){
      return true
    }

    return false
  }

  handleGetRecords = () => {
    const { depth } = this.props 
    const { projectFilter } = this.props 
    let self = this //The callback in the axios function is called not from within your function, so the 'this' is not pointing to what you expect, i.e., your class.

    if(depth >= 2){
      const { nestedAction_id } = this.props 

      axios.get(`${process.env.REACT_APP_API_URL}/NestedActions_from_parent`, {
        params: {
          parent_id: nestedAction_id
        }
      })
      .then(function (response) {
        if(response.status === 200){
          self.setState({
            records: response.data,
            dataRetrieved: true,
          })
        }
      })
    }else if(this.props.category !== 'Project'){
      axios.get(`${process.env.REACT_APP_API_URL}/${this.props.category}s_from_project`, {
        params: {
          project_id: projectFilter
        }
      })
      .then(function (response) {
        if(response.status === 200){
          self.setState({
            records: response.data,
            dataRetrieved: true,
          })
        }
      })
    } else{
      axios.get(`${process.env.REACT_APP_API_URL}/${this.props.category}s`, {})
      .then(function (response) {
        if(response.status === 200){
          self.setState({
            records: response.data,
            dataRetrieved: true,
          })
        }
      })
    }
  }

  handleNewRecord = (rec) => {
    let self = this //The callback in the axios function is called not from within your function, so the 'this' is not pointing to what you expect, i.e., your class.
    if(this.props.depth === 1){
      const { name, description, budget, status, dueTimestamp} = rec
      axios.post(`${process.env.REACT_APP_API_URL}/${self.props.category}`, {
        name,
        description,
        budget,
        status,
        dueTimestamp,
        project_id: self.props.projectFilter
      })
      .then(function (response) {
        if(response.status === 200){
          self.setState({
            records: [...self.state.records,response.data]
          })
        }
      })
    }else if(this.props.depth >= 2){
      const { name, description, budget, status, dueTimestamp} = rec
      axios.post(`${process.env.REACT_APP_API_URL}/NestedAction`, {
        name,
        description,
        budget,
        status,
        dueTimestamp,
        parent_id: self.props.nestedAction_id
      })
      .then(function (response) {
        if(response.status === 200){
          self.setState({
            records: [...self.state.records,response.data]
          })
        }
      })
    }
  }

  handleModifyRecord = (rec) => {
    let self = this //The callback in the axios function is called not from within your function, so the 'this' is not pointing to what you expect, i.e., your class.
    const { id, name, description, budget, status, dueTimestamp} = rec
    const modifyFrom = this.props.depth === 1 ? this.props.category : 'NestedAction'

    axios.put(`${process.env.REACT_APP_API_URL}/${modifyFrom}`, {
      id,
      name,
      description,
      budget,
      status,
      dueTimestamp,
    })
    .then(function (response) {
      if(response.status === 200){
        self.setState({
          records: [
            ...self.state.records.filter(rec => rec.id !== id),
            response.data
          ]
        })
      }
    })
  }

  handleDeleteRecord = (id) => {
    let self = this //The callback in the axios function is called not from within your function, so the 'this' is not pointing to what you expect, i.e., your class.

    const deleteFrom = this.props.depth === 1 ? this.props.category : 'NestedAction'

    axios.delete(`${process.env.REACT_APP_API_URL}/${deleteFrom}`, {
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
  
  componentDidMount = () => {
    this.handleGetRecords()
  }

  componentDidUpdate = () => {
    console.log("Depth rendered again")
  }

  colorSelector(category, depth=0) {
    let color = null
    let colorRange = ['darken-4','darken-3','darken-2','darken-1','','lighten-1','lighten-2','lighten-3','lighten-4','lighten-5'] //materialize color range

    if(depth===1){
      if(category === 'Project'){
        color = 'purple'
      }else if(category === 'Risk'){
        color = 'red'
      }else if(category === 'Issue'){
        color = 'orange'
      }else if(category === 'Action'){
        color = 'blue'
      }
    }else{
      color = 'pink'
    }

    return depth <= 9 ? ( 
      color + ' ' + colorRange[depth]
    ) : (
      color + ' ' + colorRange[9] // highest assignable color alteration
    )
  }

  render() {
    const { category, depth } = this.props
    const { selected } = this.props

    const color = this.colorSelector(category, depth)

    if(this.state.dataRetrieved){
      return (
        <div>
          <View
            category = {category} 
            depth = {depth} 

            color = {color}

            records = {this.state.records} 
          />

          <Option
            category = {category} 
            depth = {depth} 

            color = {color} 
          />

          <Edit
            category = {category} 
            depth = {depth} 

            color = {color} 
            
            record = {this.state.records.find(record => record.id === selected)} 
            
            handleNewRecord = {this.handleNewRecord} 
            handleModifyRecord = {this.handleModifyRecord} 
          />

          <Delete
            category = {category} 
            depth = {depth} 

            color = {color} 
            
            handleDeleteRecord = {this.handleDeleteRecord} 
          />
        </div>
      )
    }else{
      return (
        <div>Waiting on data </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
return {
    selected: state[ownProps.category].find(cat => cat.depth === ownProps.depth).selected,
    projectFilter: state.Project[0].selected,
    ...(ownProps.depth >= 2) && { nestedAction_id: state[ownProps.category].find(cat => cat.depth === ownProps.depth).nestedAction_id }, //only get the nestedAction_id when it is accessible
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Depth);