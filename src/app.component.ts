import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {WidgetComponent} from './components';
import {ConfigComponent} from './components';


@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES],
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')]
})
@RouteConfig([
  {path: '/', name: 'Widget', component: WidgetComponent, useAsDefault: true},
  {path: '/config', name: 'Config', component: ConfigComponent},
  {path: '/**', redirectTo: ['Widget']}
])
export class AppComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}