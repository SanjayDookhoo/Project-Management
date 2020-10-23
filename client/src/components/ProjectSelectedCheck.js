import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class ProjectSelectedCheck extends Component {
  componentDidMount = () => {
    if (this.props.amtOfProjects === 0){
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
    amtOfProjects: state.Project.length
  }
}

export default connect(mapStateToProps)(withRouter(ProjectSelectedCheck));