import React, { Component } from 'react';
import Levels from '../components/Levels';
import ProjectSelectedCheck from '../components/ProjectSelectedCheck'

class Actions extends Component {
  render() {
    return (
        <div>
          <ProjectSelectedCheck>
            <Levels
              category="Action"
            />
          </ProjectSelectedCheck>
        </div>
    );
  }
}

export default Actions;
