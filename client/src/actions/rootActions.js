export const selectCategory = (id, category) => {
  return {
    type: 'SELECT_CATEGORY',
    id,
    category
  }
}

export const unselectCategory = (category) => {
  return {
    type: 'UNSELECT_CATEGORY',
    category
  }
}

export const selectNestedAction = (id, level, category) => {
  return {
    type: 'SELECT_NESTED_ACTION',
    id,
    level,
    category
  }
}

export const unselectNestedAction = (level, category) => {
  return {
    type: 'UNSELECT_NESTED_ACTION',
    level,
    category
  }
}

// export const selectProject = (id) => {
//   return {
//     type: 'SELECT_PROJECT',
//     id
//   }
// }

// export const selectRisk = (id) => {
//   return {
//     type: 'SELECT_RISK',
//     id
//   }
// }

// export const selectIssue = (id) => {
//   return {
//     type: 'SELECT_ISSUE',
//     id
//   }
// }

// export const selectAction = (id) => {
//   return {
//     type: 'SELECT_ACTION',
//     id
//   }
// }

// export const selectNestedAction = (id, category) => {
//   return {
//     type: 'SELECT_NESTED_ACTION',
//     id,
//     category
//   }
// }

// export const unselectProject = (id) => {
//   return {
//     type: 'UNSELECT_PROJECT',
//     id
//   }
// }

// export const unselectRisk = (id) => {
//   return {
//     type: 'UNSELECT_RISK',
//     id
//   }
// }

// export const unselectIssue = (id) => {
//   return {
//     type: 'UNSELECT_ISSUE',
//     id
//   }
// }

// export const unselectAction = (id) => {
//   return {
//     type: 'UNSELECT_ACTION',
//     id
//   }
// }

// export const unselectNestedAction = (id, category) => {
//   return {
//     type: 'UNSELECT_NESTED_ACTION',
//     id,
//     category
//   }
// }