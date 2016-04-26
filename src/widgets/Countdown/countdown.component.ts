import {Component} from 'angular2/core';

import {SettingsComponent, TimelineComponent} from './components';


let template = require('./countdown.component.html');
let style = require('./countdown.component.scss');

@Component({
  selector: 'countdown',
  directives: [SettingsComponent, TimelineComponent],
  template: template,
  styles: [style],
})
export class CountdownComponent {}
