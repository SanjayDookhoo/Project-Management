import React, { Component } from 'react';
import axios from 'axios'
import Edit from './Edit';
import Option from './Option';
import View from './View';
import { connect } from 'react-redux'
import { selectCategory, unselectCategory, selectNestedAction, unselectNestedAction } from '../actions/rootActions'

class Depth extends Component {
  state = {
    records: []
  }

  handleGetRecords = () => {
    const { category, depth } = this.props 
    const { projectFilter } = this.props 
    let self = this //The callback in the axios function is called not from within your function, so the 'this' is not pointing to what you expect, i.e., your class.

    if(category === 'NestedAction'){
      const { nestedActionParentId } = this.props 

      axios.get(`${process.env.REACT_APP_API_URL}/NestedActions_from_parent`, {
        params: {
          parent_id: nestedActionParentId
        }
      })
      .then(function (response) {
        if(response.status === 200){
          self.setState({
            records: response.data
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
            records: response.data
          })
        }
      })
    } else{
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

  handleNewRecord = (rec) => {
    axios.post(`${process.env.REACT_APP_API_URL}/${this.props.category}`, {
      name,
      description,
      status
    })
    .then(function (response) {
      if(response.status === 200){
        this.setState({
          records: [...newRecords,response.data]
        })
      }
    })

    this.setState({
      records: [...this.state.records,rec]
    })
  }

  handleModifyRecord = (rec) => {
    const id = this.state.records.find(record => record.id == selected).id

    axios.put(`${process.env.REACT_APP_API_URL}/${this.props.category}`, {
      id,
      name,
      description,
      status
    })
    .then(function (response) {
      if(response.status === 200){
        this.setState({
          records: [...newRecords,response.data]
        })
      }
    })
  }

  handleDeleteRecord = (id) => {
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
  
  componentDidMount = () => {
    this.handleGetRecords()
  }

  componentDidUpdate = () => {
    console.log(new Date().toLocaleTimeString(),"ContainerProject.js update")
  }

  handleUnfocus = () => {
    this.setState({
      selected: -1,
      editOrCreate: false
    })
    if(this.props.category !== 'NestedAction'){
      this.props.unselectCategory(this.props.category)
    }

    if(this.props.category !== 'NestedAction' && this.props.category !== 'Project'){
      this.props.unselectNestedAction(this.props.level+1,this.props.origin)
    }else if (this.props.category === 'NestedAction'){
      this.props.unselectNestedAction(this.props.level+1,this.props.origin)
    
    }
  }

  handleFocus = (id) => {
    this.setState({
      selected: id,
      editOrCreate: false
    })
    let nestedAction = null

    if(this.props.category !== 'NestedAction'){
      this.props.selectCategory(id,this.props.category)
    }
    
    if(this.props.category !== 'NestedAction' && this.props.category !== 'Project'){
      nestedAction = this.state.records.find(record => record.id === id).nestedAction_id
      this.props.selectNestedAction(nestedAction,this.props.level+1,this.props.origin)
    }else if (this.props.category === 'NestedAction'){
      this.props.selectNestedAction(id,this.props.level+1,this.props.origin)
    }
  }


  colorSelector(category, depth=0) {
    let color = null
    let colorRange = ['darken-4','darken-3','darken-2','darken-1','','lighten-1','lighten-2','lighten-3','lighten-4','lighten-5'] //materialize color range

    if(category === 'Project'){
      color = 'purple'
    }else if(category === 'Risk'){
      color = 'red'
    }else if(category === 'Issue'){
      color = 'orange'
    }else if(category === 'Action'){
      color = 'blue'
    }else if(category === 'NestedAction'){
      color = 'grey'
    }

    return level <= 10 ? ( 
      color + ' ' + colorRange[depth]
    ) : (
      color + ' ' + colorRange[9] // highest assignable color alteration
    )
  }

  render() {
    const { category, depth } = this.props
    const { selected, edit, option } = this.props

    const color = this.colorSelector(category, depth)

    return (
      <div>
        <View
          category = {category} 
          depth = {depth} 

          color = {color}

          records = {this.state.records} 
          handleFocus = {this.handleFocus} 
          handleUnfocus= {this.handleUnfocus} 
        />

        <Option
          category = {category} 
          depth = {depth} 

          color = {color} 
          
          handleEditOrCreateClick = {this.handleEditOrCreateClick} 
          handleDeleteRecord = {this.handleDeleteRecord} 
        />

        <Edit
          category = {category} 
          depth = {depth} 

          color = {color} 
          
          record = {this.state.records.find(record => record.id == selected)} 
          
          closeEditOrCreate = {this.closeEditOrCreate} 
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
return {
    selected: state[ownProps.category].selected,
    edit: state[ownProps.category].edit,
    option: state[ownProps.category].option,

    projectFilter: state.Project[0].selected, //only one or no project will ever exist in the list, only one will exist once this component can be reached
    ...(ownProps.category === 'NestedAction' && ownProps.depth === 2) && { nestedActionParentId: state[ownProps.category].find(cat => cat.depth === 1).nestedAction_id },
    ...(ownProps.category === 'NestedAction' && ownProps.depth > 2 ) && { nestedActionParentId: state[ownProps.category].find(cat => cat.depth === ownProps.depth-1).id },
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectCategory: (id, category) => { dispatch(selectCategory(id, category)) },
    unselectCategory: (category) => { dispatch(unselectCategory(category)) },
    selectNestedAction: (id, level, category) => { dispatch(selectNestedAction(id, level, category)) },
    unselectNestedAction: (id, level, category) => { dispatch(unselectNestedAction(id, level, category)) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Depth);


