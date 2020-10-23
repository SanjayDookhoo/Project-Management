import React, { Component } from 'react';
import { connect } from 'react-redux'

class Reports extends Component {
  render() {
    const { projectSelected } = this.props
    
    if(projectSelected){
      return (
        <div>
            reports 
        </div>
      )
    }else{
      return null
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    projectSelected: state.Project[0].selected === -1 ? false : true
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Reports);