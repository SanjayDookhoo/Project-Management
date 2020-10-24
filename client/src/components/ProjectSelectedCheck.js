import { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class ProjectSelectedCheck extends Component {
  componentDidUpdate = () => {
    console.log("ProjectSelectedCheck rendered again")
  }

  componentDidMount = () => {
    if (!this.props.projectSelected){
      this.props.history.push('/')
    }
  }

  render() {
     // if this is not specified, the component will attempt to render the childing after the redirect is initiated 
     // becuase the redirect takes some time the children attempts to load despite this shouldnt be the case
     // in some scenarios it would create a 'memory leak', this is to prevent it from happening at all
    if (this.props.projectSelected){
      return (
        this.props.children
      )
    }else{
      return (null)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    projectSelected: state.Project[0].selected === -1 ? false : true
  }
}

export default connect(mapStateToProps)(withRouter(ProjectSelectedCheck));