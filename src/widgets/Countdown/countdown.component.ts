import {Component} from 'angular2/core';
import {NgStyle} from 'angular2/common';

import {SettingsComponent} from './components/Settings.component';
import {TimelineComponent} from './components/Timeline.component';
import {Config} from './Config';
import {Goal} from './Goal';


let template = require('./Countdown.component.html');
let style = require('./Countdown.component.scss');

@Component({
  selector: 'countdown',
  directives: [SettingsComponent, TimelineComponent],
  template: template,
  styles: [style],
})
export class CountdownComponent {
  config: Config = new Config();
  goal: Goal = new Goal();

  getSettingsStyle() {
    return {
      top: this.config.widgetHeight + 'px',
    };
  }
}
