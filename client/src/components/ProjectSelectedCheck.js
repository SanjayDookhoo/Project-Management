import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class ProjectSelectedCheck extends Component {
  componentDidMount = () => {
    if (this.props.projectSelected === -1){
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
    projectSelected: state.Project[0].selected
  }
}

export default connect(mapStateToProps)(withRouter(ProjectSelectedCheck));