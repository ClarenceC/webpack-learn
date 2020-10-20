
function component() {
  const element = document.createElement('div')

  element.innerHTML =  join(['Hello', 'webpack'], ' ')

  this.alert('Hmmm, this probably isn\t a great idea...')

  return element
}

document.body.appendChild(component())

fetch('http://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => {
    console.log('We retrieved some data! And we\'re confident it will work on a variety of brower distributions.')
    console.log(json)
  })
  .catch(error => console.error('Something went wrong when fetching this data:', error))