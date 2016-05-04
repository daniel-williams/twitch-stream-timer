import {Component} from 'angular2/core';

import {SettingsComponent} from './components/settings.component';
import {TimelineComponent} from './components/timeline.component';
import {Config} from './Config';


let template = require('./countdown.component.html');
let style = require('./countdown.component.scss');

@Component({
  selector: 'countdown',
  directives: [SettingsComponent, TimelineComponent],
  template: template,
  styles: [style],
})
export class CountdownComponent {
  config: Config = new Config();

  // TODO(djw): Remove this when we're done testing
  get diagnostic() {
    return JSON.stringify({
      settings: JSON.stringify(this.config),
      // goal: JSON.stringify(this.goal),
    });
  }
}
