// selected refers to the state of a single item in the View component being focused (in the specific category and depth)
// @param nestedAction_id is passed in to connect the initial Risk, Issue and Actions with successive Nested Actions
// @param recordToEdit is the entire record of information that was selected/focused, this information is retrieved by the edit component if needed, this prevents the need to rerender the entire parent component for the edit component to rerender
export const changeSelected = (category, depth, value, nestedAction_id = null, recordToEdit = null) => {
  return {
    type: 'CHANGE_SELECTED',
    value,
    depth,
    category,
    nestedAction_id,
    recordToEdit
  }
}
// edit is the state of the edit/create component  (in the specific category and depth)
export const changeEdit = (category, depth, value) => {
  return {
    type: 'CHANGE_EDIT',
    value,
    depth,
    category
  }
}
// option is the state of the option component (in the specific category and depth)
export const changeOption = (category, depth, value) => {
  return {
    type: 'CHANGE_OPTION',
    value,
    depth,
    category
  }
}
// option is the state of the delete component (in the specific category and depth)
export const changeDelete = (category, depth, value, success=false) => {
  return {
    type: 'CHANGE_DELETE',
    value,
    depth,
    category,
    success
  }
}