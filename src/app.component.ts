import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {CountdownComponent} from './widgets';


@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES],
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')],
  encapsulation: ViewEncapsulation.None
})
@RouteConfig([
  {path: '/', name: 'Countdown', component: CountdownComponent, useAsDefault: true},
  {path: '/**', redirectTo: ['Countdown']}
])
export class AppComponent {
}
