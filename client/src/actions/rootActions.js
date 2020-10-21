export const changeSelected = (category, depth, value) => {
  return {
    type: 'CHANGE_SELECTED',
    value,
    depth,
    category
  }
}

export const changeEdit = (category, depth, value) => {
  return {
    type: 'CHANGE_EDIT',
    value,
    depth,
    category
  }
}

export const changeOption = (category, depth, value) => {
  return {
    type: 'CHANGE_OPTION',
    value,
    depth,
    category
  }
}