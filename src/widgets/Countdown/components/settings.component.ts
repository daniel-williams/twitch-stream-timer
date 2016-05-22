import {Component, Input, AfterViewInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgStyle} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {NgForm} from 'angular2/common';

import {Config} from '../Config';
import {Goal} from '../Goal';
import {Donation} from '../Donation';
import {numberConverter} from '../../../utils/TypeConverters';

import {TimePicker} from './TimePicker.component';
import {TimePickerAccessor} from './TimePicker.accessor';

import {DurationComponent} from './Duration.component';
import {DurationAccessor} from './Duration.accessor';

import {DonationsComponent} from './Donations.component';
import {DonationsAccessor} from './Donations.accessor';


// webpack imports
let template = require('./Settings.component.html');
let style = require('./Settings.component.scss');

let intervals = [1, 5, 10, 15, 30, 45, 60]; // TODO(djw): convert into value provider

@Component({
  selector: 'settings',
  directives: [
    TimePicker,
    TimePickerAccessor,
    DurationComponent,
    DurationAccessor,
    DonationsComponent,
    DonationsAccessor,
    CORE_DIRECTIVES,
    FORM_DIRECTIVES,
    ROUTER_DIRECTIVES,
  ],
  template: template,
  styles: [style],
  host: {
    '[class.settings]': 'true'
  },
})
export class SettingsComponent implements AfterViewInit {

  @Input() config: Config;
  @Input() goal: Goal;

  public isMeridian: boolean = true;
  public timeInterval: number = 15;

  get intervals() {
    return intervals;
  }

  ngAfterViewInit() {
    let jscolor = (<any>window).jscolor;
    if (jscolor) {
      let items = document.querySelectorAll('.settings input.color');
      for (let i = 0; i < items.length; i++) {
        let p = new jscolor(items[i]).fromString((<HTMLInputElement>items[i]).value);
      }
    }
  }

  private handleTargetChanged(target) {
    let amount = parseInt(target.value, 10);
    if (!isNaN(amount)) {
      this.goal.targetAmount = amount;
    } else {
      target.value = this.goal.targetAmount;
    }
  }

  private handleColorChange(val, prop) {
    this.config[prop] = val;
  }

  private handleEndTimeChange(v: number): void {
    this.config.maxMilliseconds = Math.max(v, this.config.maxMilliseconds);
  }

  private handleMaxTimeChange(v: number): void {
    this.config.minMilliseconds = Math.min(this.config.minMilliseconds, v);
  }
}
