export const changeSelected = (category, depth, value, nestedAction_id = null) => {
  return {
    type: 'CHANGE_SELECTED',
    value,
    depth,
    category,
    nestedAction_id
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

export const changeDelete = (category, depth, value, success=false) => {
  return {
    type: 'CHANGE_DELETE',
    value,
    depth,
    category,
    success
  }
}