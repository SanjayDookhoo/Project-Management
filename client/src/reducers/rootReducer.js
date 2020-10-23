const initState ={
  Project: [
    {
      depth: 1,
      category: 'Project',
      
      selected: -1,
      edit: false,
      delete: false,
      option: true,

      // nestedAction_id: 1 
    }
  ],
  Risk: [
    {
      depth: 1,
      category: 'Risk',
      
      selected: -1,
      edit: false,
      delete: false,
      option: true,

      // nestedAction_id: 1 
    }
  ],
  Issue: [
    {
      depth: 1,
      category: 'Issue',
      
      selected: -1,
      edit: false,
      delete: false,
      option: true,

      // nestedAction_id: 1 
    }
  ],
  Action: [
    {
      depth: 1,
      category: 'Action',
      
      selected: -1,
      edit: false,
      delete: false,
      option: true,

      // nestedAction_id: 1 
    }
  ]
}

const rootReducer = (state = initState, action) => {
  if(action.type === 'CHANGE_SELECTED'){
    if(action.value === -1){
      const temp = state[action.category].find(cat => cat.depth === action.depth)
      temp.selected = action.value
      temp.edit = false
      temp.delete = false
      temp.option = true

      return {
        ...state,
        [action.category]: [
          ...state[action.category].filter(cat => cat.depth < action.depth), //deletes the current depth in question and higher depths
          temp //inserts current depth with changes
        ]
      }
    }else{
      
      
      const newArray = state[action.category].map(item => {
        var temp = Object.assign({}, item);
          temp.edit = false
          temp.delete = false
          temp.option = false
          return temp;
        })

      const temp = newArray.find(cat => cat.depth === action.depth)
      temp.selected = action.value
      temp.edit = false
      temp.delete = false
      temp.option = true
      temp.recordToEdit = action.recordToEdit //this will allow the edit component to see which record there is to edit if there is one, prevents needing to rerender entire parent component

      const newRecord = {
        depth: action.depth + 1,
        category: action.category,

        selected: -1,
        edit: false,
        option: true,

        nestedAction_id: action.nestedAction_id
      }

      return {
        ...state,
        [action.category]: [
          ...newArray.filter(cat => cat.depth < action.depth), //deletes the current depth in question and higher depths
          temp, //inserts current depth with changes
          newRecord
        ]
      }
    }
  }

  if(action.type === 'CHANGE_EDIT'){
    const temp = state[action.category].find(cat => cat.depth === action.depth)
    temp.delete = false
    temp.edit = action.value

    if(action.value)
      return {
        ...state,
        [action.category]: [
          ...state[action.category].filter(cat => cat.depth !== action.depth),
          temp
        ]
      }
    else {
      return {
        ...state,
        [action.category]: [
          ...state[action.category].filter(cat => cat.depth !== action.depth),
          temp
        ]
      }
    }
  }

  if(action.type === 'CHANGE_OPTION'){
    const temp = state[action.category].find(cat => cat.depth === action.depth)
    temp.option = action.value

    return {
      ...state,
      [action.category]: [
        ...state[action.category].filter(cat => cat.depth !== action.depth),
        temp
      ]
    }
  }

  if(action.type === 'CHANGE_DELETE'){
    const temp = state[action.category].find(cat => cat.depth === action.depth)
    temp.edit = false
    temp.delete = action.value

    if(action.success){
      temp.selected = -1
      temp.option = true
      return {
        ...state,
        [action.category]: [
          ...state[action.category].filter(cat => cat.depth < action.depth),
          temp
        ]
      }
    }else{
      if(action.value){
        temp.option = false
      }else{
        temp.option = true
      }
      return {
        ...state,
        [action.category]: [
          ...state[action.category].filter(cat => cat.depth !== action.depth),
          temp
        ]
      }

    }
  }

  return state

}

export default rootReducer