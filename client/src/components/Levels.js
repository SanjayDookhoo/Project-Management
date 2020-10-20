import React, { Component } from 'react';
import Level from './Level';
import { connect } from 'react-redux'

class Levels extends Component {
  colorSelector(category, level=1) {
    let color = null
    let colorRange = ['darken-4','darken-3','darken-2','darken-1','','lighten-1','lighten-2','lighten-3','lighten-4','lighten-5'] //materialize color range

    if(category === 'Project'){
      color = 'purple'
    }else if(category === 'Risk'){
      color = 'red'
    }else if(category === 'Issue'){
      color = 'orange'
    }else if(category === 'Action'){
      color = 'blue'
    }else if(category === 'Nested Action'){
      color = 'gray'
    }
    return color + ' ' + colorRange[level-1]
  }

  render() {
    const { projectSelected, category } = this.props
    let color = null
    let firstLevel = null
    
    color = this.colorSelector(category)
    if(category === 'Project'){
      firstLevel = (
        <Level
          category={category}
          color={color}
        />
      )
    }else{
      firstLevel = (
        <Level
          category={category}
          projectFilter={projectSelected}
          color={color}
        />
      )
    }
    
    return (
      <div>
        {firstLevel}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    projectSelected: state.projectSelected
  }
}

export default connect(mapStateToProps)(Levels);