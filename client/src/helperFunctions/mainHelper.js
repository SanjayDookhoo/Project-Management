export const statusField = (category, depth) => {
  if(depth >= 2) return 'Accomplished'
  else if (category === 'Risk') return 'Probable'
  else if (category === 'Issue') return 'Resolved'
  else if (category === 'Action') return 'Fulfilled'
  else if (category === 'Project') return 'Completed'

  return null
}