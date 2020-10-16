// import _ from 'lodash'
// import printMe from './print.js'


// function component() {
//   const element = document.createElement('div')
//   const btn = document.createElement('button')

//   element.innerHTML = _.join(['Hello', 'webpack'], ' ')

//   btn.innerHTML = 'Click me and check the console!'
//   btn.onclick = printMe

//   element.appendChild(btn)

//   return element
// }

// if (module.hot) {
//   module.hot.accept('./print.js', function() {
//     console.log('Accepting the updated printMe module!')
//     printMe()
//   })
// }

// document.body.appendChild(component())

import { cube } from './math'

function component() {
  const element = document.createElement('pre')

  Element.innerHTML = [
    'Hello webpack!',
    '5 cube is equal to ' + cube(5)
  ].join('\n\n')

  return element
}

document.body.appendChild(component())