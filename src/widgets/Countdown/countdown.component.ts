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

  constructor() {
    let loadedConfig = window.localStorage['config'];
    let loadedGoal = window.localStorage['goal'];
    if (loadedConfig) {
      loadedConfig = JSON.parse(loadedConfig);
      loadedConfig.startTime = new Date(loadedConfig.startTime);
      this.config = Object.assign({}, this.config, loadedConfig);
    }
    if (loadedGoal) {
      loadedGoal = JSON.parse(loadedGoal);
      this.goal.targetAmount = loadedGoal.targetAmount;
    }
  }

  handleOnGoalChanged(val) {
    let v = Object.assign({}, val);
    v.donations = [];
    window.localStorage['goal'] = JSON.stringify(v);
  }

  handleOnConfigChanged(val) {
    window.localStorage['config'] = JSON.stringify(val);
  }

  private getSettingsStyle() {
    return {
      top: this.config.widgetHeight + 'px',
    };
  }
}
