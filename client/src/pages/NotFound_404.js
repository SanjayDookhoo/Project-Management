import React, { Component } from 'react';
import ProjectSelectedCheck from '../components/ProjectSelectedCheck'
import Category from '../components/Category';

class NotFound_404 extends Component {
  render() {
    return (
        <div>
          <div className={"post card"}> 
            <div className="card-content"> 
              404- Page Not Found
            </div>
          </div>
        </div>
    );
  }
}

export default NotFound_404;
