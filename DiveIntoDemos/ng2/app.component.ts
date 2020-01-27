import {Component} from '@angular/core'

@Component({
    // 标签名称
    selector: 'app-root',
    // HTML 模版
    template: '<h1>{{msg}}</h1>',
    // CSS 样式
    styles: ['h1{ color:red }']
})

export class AppComponent {
    msg = 'Hello, Webpack'
}