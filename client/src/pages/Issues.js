import React, { Component } from 'react';
import ProjectSelectedCheck from '../components/ProjectSelectedCheck'
import Category from '../components/Category';

class Issues extends Component {
  render() {
    return (
        <div>
          <ProjectSelectedCheck>
            <Category
              category='Issue'
            />
          </ProjectSelectedCheck>
        </div>
    );
  }
}

export default Issues;
