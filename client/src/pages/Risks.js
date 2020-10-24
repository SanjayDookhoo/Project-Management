import React, { Component } from 'react';
import ProjectSelectedCheck from '../components/ProjectSelectedCheck'
import Category from '../components/Category';

class Risks extends Component {
  render() {
    return (
        <div>
          <ProjectSelectedCheck>
            <Category
              category='Risk'
            />
          </ProjectSelectedCheck>
        </div>
    );
  }
}

export default Risks;
