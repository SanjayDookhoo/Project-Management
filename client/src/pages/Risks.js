import React, { Component } from 'react';
import Levels from '../components/Levels';
import ProjectSelectedCheck from '../components/ProjectSelectedCheck'

class Risks extends Component {
  render() {
    return (
        <div>
          <ProjectSelectedCheck>
            <Levels
              category="Risk"
            />
          </ProjectSelectedCheck>
        </div>
    );
  }
}

export default Risks;
