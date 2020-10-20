import React, { Component } from 'react';
import Level from './Level';

class Levels extends Component {
  state = {
    temp: null
  }

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
    const { category } = this.props
    let color = null
    
    color = this.colorSelector(category)
    const firstLevel = (
      <Level
        category={category}
        filter={1}
        color={color}
      />
    )
    return (
      <div>
        {firstLevel}
      </div>
    )
  }
}

export default Levels;