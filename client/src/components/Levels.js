import React, { Component } from 'react';
import Level from './Level';
import { connect } from 'react-redux'

class Levels extends Component {
  colorSelector(category, level=0) {
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
    }else if(category === 'NestedAction'){
      color = 'grey'
    }

    return level <= 10 ? ( 
      color + ' ' + colorRange[level]
    ) : (
      color + ' ' + colorRange[9] // highest assignable color alteration
    )
  }

  render() {
    const { mainCategoryIsFocused, projectSelected, nestedActions, category } = this.props
    let firstLevel = null
    let firstLevelColor = null

    let otherLevelsList = nestedActions.map( (nestedAction, index) => {
      return(
        <div key={index+1}>
          <Level
            level={index+1}
            nestedActionFilter={nestedAction}
            origin={category}
            category='NestedAction'
            color={this.colorSelector('NestedAction',index)}
          />
        </div>
      )
    })

    firstLevelColor = this.colorSelector(category)
    if(category === 'Project'){
      firstLevel = (
        <Level
          level={0}
          origin={category}
          category={category}
          color={firstLevelColor}
        />
      )
    }else{
      firstLevel = (
        <Level
          level={0}
          origin={category}
          category={category}
          projectFilter={projectSelected}
          color={firstLevelColor}
        />
      )
    }
    
    return (
      <div>
        {firstLevel}
        {category !== 'Project' &&  mainCategoryIsFocused != null ? otherLevelsList : null}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    nestedActions: state[ownProps.category].nestedActions,
    mainCategoryIsFocused: state[ownProps.category].selected,
    projectSelected: state.Project.selected
  }
}

export default connect(mapStateToProps)(Levels);