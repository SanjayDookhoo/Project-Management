const initState = {
  Project: [
    {
      depth: 1,
      category: 'Project',
      
      selected: -1,
      edit: false,
      option: false,

      nestedAction_id: 1 // this is only assigned when the depth is 1
    }
  ]
}

const rootReducer = (state = initState, action) => {
  if(action.type === 'CHANGE_SELECTED'){
    const temp = state[action.category].find(cat => cat.depth === action.depth)
    temp.selected = action.value

    return {
      ...state,
      [action.category]: [
        state[action.category].filter(cat => cat.depth !== action.depth),
        temp
      ]
    }
  }

  if(action.type === 'CHANGE_EDIT'){
    const temp = state[action.category].find(cat => cat.depth === action.depth)
    temp.edit = action.value

    return {
      ...state,
      [action.category]: [
        state[action.category].filter(cat => cat.depth !== action.depth),
        temp
      ]
    }
  }

  if(action.type === 'CHANGE_OPTION'){
    const temp = state[action.category].find(cat => cat.depth === action.depth)
    temp.option = action.value

    return {
      ...state,
      [action.category]: [
        state[action.category].filter(cat => cat.depth !== action.depth),
        temp
      ]
    }
  }

  return {

  }

}