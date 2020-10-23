import React, { Component } from 'react';
import Category from '../components/Category';

class Reports extends Component {
  render() {
    const { selectedProject } = this.props

    return (
        <div>
            reports for {selectedProject}
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedProject: state.Project.selected
  }
}

export default connect(mapStateToProps)(withRouter(Reports));