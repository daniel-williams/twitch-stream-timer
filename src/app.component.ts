import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {CountdownComponent} from './widgets';
import {CustomInput, MyInput} from './widgets';
import {WrappedInput, WrappedInputAccessor} from './widgets';

interface IName {
  first: string;
  middle: string;
  last: string;
}

@Component({
  selector: 'app',
  directives: [CustomInput, MyInput, WrappedInput, WrappedInputAccessor, ROUTER_DIRECTIVES],
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')],
  encapsulation: ViewEncapsulation.None
})
@RouteConfig([
  {path: '/', name: 'Countdown', component: CountdownComponent, useAsDefault: true},
  {path: '/**', redirectTo: ['Countdown']}
])
export class AppComponent {
  public name: IName = {first: 'f', middle: 'm', last: 'l'};

  logValueChange(evt) {
    console.log('logValueChange:', evt);
  }
  logChange(evt) {
    console.log('logChange:', evt);
  }
}
