import React, { Component } from 'react'
import { render } from 'react-dom'
import './main.css'

class ButtonHead extends Component {
    render(){
        return <h1>Hello,Webpack</h1>
    }
}

render(
    <ButtonHead/>,
    window.document.getElementById('app')
)