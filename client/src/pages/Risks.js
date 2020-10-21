import React, { Component } from 'react';
import Levels from '../components/Levels';
import ProjectSelectedCheck from '../components/ProjectSelectedCheck'
import Category from '../components/Category';

class Risks extends Component {
  render() {
    return (
        <div>
          <ProjectSelectedCheck>
            {/* <Levels
              category="Risk"
            /> */}

            <Category
              category="Risk"
            />

          </ProjectSelectedCheck>
        </div>
    );
  }
}

export default Risks;
