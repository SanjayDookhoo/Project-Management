export const statusField = (category, depth) => {
  if(depth >= 2) return 'Accomplished'
  else if (category === 'Risk') return 'Likely to Happen'
  else if (category === 'Issue') return 'Resolved'
  else if (category === 'Action') return 'Fulfilled'
  else if (category === 'Project') return 'Completed'

  return null
}

//random rgba color generator with a opacity of 0.3
export const getRandomColors = (amount) => {
  var colors = []
  for (var count = 0; count < amount; count++ ) {
    var color = 'rgba(';
    for (var i = 0; i < 3; i++ ) {
        color += Math.floor(Math.random() * 255) + ','; 
    }
    color += '0.3)' 
    colors.push(color);
  }

  return colors;
}