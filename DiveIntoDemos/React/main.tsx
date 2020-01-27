import * as React from 'react';
import {render} from 'react-dom';

class Button extends React.Component {
    render(){
        return <h1>Hello, Webpack</h1>
    }
}
render(
    <Button/>,
    window.document.getElementById('app')
)