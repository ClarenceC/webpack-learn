import 'core-js/es6/reflect'
import 'core-js/es7/reflect'
import 'zone.js/dist/zone'

import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'

import {AppComponent} from './app.component'

@NgModule({
    // 该 NgModule 所依赖的视图组件
    declarations: [AppComponent],
    // 该 NgModule 所依赖的其它 NgModule
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule)