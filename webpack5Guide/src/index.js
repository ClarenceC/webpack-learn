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

import _ from 'lodash'

function component () {
  const element = document.createElement('div')
  const button = document.createElement('button')
  const br = document.createElement('br')

  button.innerHTML = 'Click me and look at the console!'
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')

  element.appendChild(br)
  element.appendChild(button)

  button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    const print = module.default
    print()
  })
  return element
}

document.body.appendChild(component())
