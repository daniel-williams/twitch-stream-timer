import {Component} from 'angular2/core';

import {CountdownSettingsComponent} from './countdown-settings.component';
import {CountdownTimelineComponent} from './countdown-timeline.component';


let template = require('./countdown.component.html');
let style = require('./countdown.component.scss');

@Component({
  selector: 'countdown',
  directives: [CountdownSettingsComponent, CountdownTimelineComponent],
  template: template,
  styles: [style],
})
export class CountdownComponent {}
