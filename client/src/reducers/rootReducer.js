const initState = {
  projectSelected: 1
}

const rootReducer = (state = initState, action) => {
  if(action.type === 'SELECT_PROJECT'){
    return {
      ...state,
      projectSelected: action.id
    }
  }

  return state;
}

export default rootReducer