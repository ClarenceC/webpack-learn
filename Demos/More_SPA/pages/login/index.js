import React from 'react'
import { render } from 'react-dom'
import './index.css'

class App extends React.Component {
    render() {
        return <h1>Page Login</h1>
    }
}

render(
    <App/>,
    window.document.getElementById('app')
)