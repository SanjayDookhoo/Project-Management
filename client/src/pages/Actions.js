import React, { Component } from 'react';
import ProjectSelectedCheck from '../components/ProjectSelectedCheck'
import Category from '../components/Category';

class Actions extends Component {
  render() {
    return (
        <div>
          <ProjectSelectedCheck>
            <Category
              category="Action"
            />
          </ProjectSelectedCheck>
        </div>
    );
  }
}

export default Actions;
