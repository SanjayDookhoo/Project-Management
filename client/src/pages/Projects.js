import React, { Component } from 'react';
import Levels from '../components/Levels';
import ProjectSelectedCheck from '../components/ProjectSelectedCheck'

class Projects extends Component {
  render() {
    return (
        <div>
          <ProjectSelectedCheck>
            <Levels
              category="Project"
            />
          </ProjectSelectedCheck>
        </div>
    );
  }
}

export default Projects;
