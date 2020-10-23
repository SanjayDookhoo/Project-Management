// from the category selected, render all from the redux related array

import React, { Component } from 'react';
import Depth from './Depth';
import { connect } from 'react-redux'
import Reports from '../pages/Reports';

class Category extends Component {
  componentDidUpdate = () => {
    console.log("Category rendered again")
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    //only renders again if the amount of items in the array has changed, otherwise, even if the items in the array changes due to other components, this component will be unaffected
    if(nextProps.categoryArray.length !== this.props.categoryArray.length){
      return true
    }

    return false
  }

  render() {
    const { category, categoryArray } = this.props

    if(category !== 'Project'){
      const categoryList = categoryArray.sort((a, b) => a.depth - b.depth).map(categoryEl => {
        return (
          <div key={category+categoryEl.depth}>
            <Depth
              depth={categoryEl.depth}
              category={category}
            />
          </div>
        )
      })
  
      return (
          categoryList
      )
    }else{
      return (
        <div>
          <Depth
            depth={1}
            category={category}
          />
          <Reports />
        </div>
      )
    }
    
    
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categoryArray: state[ownProps.category]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Category);
