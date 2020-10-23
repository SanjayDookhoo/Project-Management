// from the category selected, render all from the redux related array

import React, { Component } from 'react';
import Depth from './Depth';
import { connect } from 'react-redux'
import Reports from './Reports';

class Category extends Component {
  componentDidUpdate = () => {
    console.log("Category update")
  }

  shouldComponentUpdate = (nextProps, nextState) => {


    // prevents rerendering when the user makes a selection or unselection in Project component
    // the category is handled essentially the same way as (Risk, Issue, Action) because of its similarity
    // because of this, there will be another element added to the array on selection, but this element has nothing relevant for rendering
    if(nextProps.category === 'Project' && this.props.category === 'Project'){
      return false
    }

    //only renders again if the amount of items in the array has changed, otherwise, even if the items in the array changes due to other components, this component will be unaffected
    if(nextProps.categoryArray.length !== this.props.categoryArray.length){
      return true
    }

    return false
  }

  render() {
    const { category } = this.props
    const { categoryArray } = this.props

    if(category !== 'Project'){
      const categoryArrayLen = categoryArray.length
      const categoryList = categoryArray.sort((a, b) => a.depth - b.depth).map((categoryEl, index) => {
        return (
          <div key={category+categoryEl.depth}>
            <Depth
              depth={categoryEl.depth}
              category={category}
            />

            {index < categoryArrayLen -1 ? (
              <div className="row center">
              <i className="material-icons">arrow_drop_down</i>
            </div>
            ) : (
              null
            )}
            
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
    categoryArray: state[ownProps.category],
    projectSelected: state.Project[0].selected === -1 ? false : true
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Category);
