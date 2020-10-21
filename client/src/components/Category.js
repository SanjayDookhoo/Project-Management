// from the category selected, render all from the redux related array

import React, { Component } from 'react';
import Depth from './Depth';
import { connect } from 'react-redux'

class Category extends Component {
  render() {
    const { category, categoryArray } = this.props

    const categoryList = categoryArray.map(categoryEl => {
      return (
        //depth (which is what level was)

        <Depth
          depth={categoryEl.depth}
          category={category}
        />
      )
    })

    return (
        {categoryList}
    );
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
