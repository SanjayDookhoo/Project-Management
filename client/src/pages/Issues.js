import React, { Component } from 'react';
import Levels from '../components/Levels';
import ProjectSelectedCheck from '../components/ProjectSelectedCheck'

class Issues extends Component {
  render() {
    return (
        <div>
          <ProjectSelectedCheck>
            <Levels
              category="Issue"
            />
          </ProjectSelectedCheck>
        </div>
    );
  }
}

export default Issues;
