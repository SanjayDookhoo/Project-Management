import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class ProjectSelectedCheck extends Component {
  componentDidMount = () => {
    if (this.props.projectSelected === null){
      this.props.history.push('/')
    }
  }

  render() {
    return (
      this.props.children
    )
  }
}

const mapStateToProps = (state) => {
  return {
    projectSelected: state.Project.selected
  }
}

export default connect(mapStateToProps)(withRouter(ProjectSelectedCheck));