const initState = {
  Project: {
    selected: null,
    nestedActions: []
  },
  Risk : {
    selected: null,
    nestedActions: [] //stored in a similar format as Risk/Issue/Action, except with the addtion of a key
  },
  Issue : {
    selected: null,
    nestedActions: []
  },
  Action : {
    selected: null,
    nestedActions: []
  }
}

const rootReducer = (state = initState, action) => {

  if(action.type === 'SELECT_CATEGORY'){
    return {
      ...state,
      [action.category]: {
        ...state[action.category],
        selected: action.id
      }
    }
  }

  if(action.type === 'UNSELECT_CATEGORY'){
    return {
      ...state,
      [action.category]: {
        ...state[action.category],
        selected: null
      }
    }
  }

  if(action.type === 'SELECT_NESTED_ACTION'){
    let temp = {
      id: action.id,
      level: action.level
    }
    return {
      ...state,
      [action.category]: {
        ...state[action.category],
        nestedActions: 
          [...state[action.category].nestedActions,
          temp]
        
      }
    }
    
  }

  if(action.type === 'UNSELECT_NESTED_ACTION'){
    return {
      ...state,
      [action.category]: {
        ...state[action.category],
        nestedActions: state[action.category].nestedActions.filter(nestedAction => nestedAction.level !== action.level)
      }
    }
  }

  // if(action.type === 'SELECT_PROJECT'){
  //   return {
  //     ...state,
  //     Project: {
  //       ...state.Project,
  //       selected: action.id
  //     }
  //   }
  // }

  // if(action.type === 'SELECT_RISK'){
  //   return {
  //     ...state,
  //     Risk: {
  //       ...state.Risk,
  //       selected: action.id
  //     }
  //   }
  // }

  // if(action.type === 'SELECT_ISSUE'){
  //   return {
  //     ...state,
  //     Issue: {
  //       ...state.Issue,
  //       selected: action.id
  //     }
  //   }
  // }

  // if(action.type === 'SELECT_ACTION'){
  //   return {
  //     ...state,
  //     Action: {
  //       ...state.Action,
  //       selected: action.id
  //     }
  //   }
  // }

  // if(action.type === 'SELECT_NESTED_ACTION'){
  //   let na = state[action.category].nestedActions
  //   let temp = {
  //     id: action.id
  //   }
  //   na.push(temp)
  //   return {
  //     ...state,
  //     [action.category]: {
  //       ...state[action.category],
  //       nestedActions: na
  //     }
  //   }
  // }

  // if(action.type === 'UNSELECT_PROJECT'){
  //   return {
  //     ...state,
  //     Project: {
  //       ...state.Project,
  //       selected: null
  //     }
  //   }
  // }

  // if(action.type === 'UNSELECT_RISK'){
  //   return {
  //     ...state,
  //     Risk: {
  //       ...state.Risk,
  //       selected: null
  //     }
  //   }
  // }

  // if(action.type === 'UNSELECT_ISSUE'){
  //   return {
  //     ...state,
  //     Issue: {
  //       ...state.Issue,
  //       selected: null
  //     }
  //   }
  // }

  // if(action.type === 'UNSELECT_ACTION'){
  //   return {
  //     ...state,
  //     Action: {
  //       ...state.Action,
  //       selected: null
  //     }
  //   }
  // }

  // if(action.type === 'ADD_PROJECT_NESTED_ACTION'){
  //   let na = state.Project.nestedActions
  //   let temp = {
  //     id: action.id
  //   }
  //   na.push(temp)
  //   return {
  //     ...state,
  //     Project: {
  //       ...state.Project,
  //       nestedActions: na
  //     }
  //   }
  // }

  // if(action.type === 'ADD_RISK_NESTED_ACTION'){
  //   let na = state.Risk.nestedActions
  //   let temp = {
  //     id: action.id
  //   }
  //   na.push(temp)
  //   return {
  //     ...state,
  //     Risk: {
  //       ...state.Risk,
  //       nestedActions: na
  //     }
  //   }
  // }

  // if(action.type === 'ADD_ISSUE_NESTED_ACTION'){
  //   let na = state.Issue.nestedActions
  //   let temp = {
  //     id: action.id
  //   }
  //   na.push(temp)
  //   return {
  //     ...state,
  //     Issue: {
  //       ...state.Issue,
  //       nestedActions: na
  //     }
  //   }
  // }

  // if(action.type === 'ADD_ACTION_NESTED_ACTION'){
  //   let na = state.Action.nestedActions
  //   let temp = {
  //     id: action.id
  //   }
  //   na.push(temp)
  //   return {
  //     ...state,
  //     Action: {
  //       ...state.Action,
  //       nestedActions: na
  //     }
  //   }
  // }

  return state;
}

export default rootReducer