import {Component, AfterViewInit, ViewChild} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {NgForm} from 'angular2/common';
import {Timepicker} from 'ng2-bootstrap';

import {IConfig, Config} from '../config';
import {DurationComponent} from './duration.component';
import {NumberInputComponent} from './number-input.component';

import {Donation} from '../Donation';
import {Goal} from '../Goal';
import {numberConverter} from '../../../utils/TypeConverters';


// webpack imports
let template = require('./settings.component.html');
let style = require('./settings.component.scss');

let formats = ['2:00 PM', '14:00']; // TODO(djw): convert into value provider
let intervals = [1, 5, 10, 15, 30, 45, 60]; // TODO(djw): convert into value provider

@Component({
  selector: 'settings',
  directives: [
    Timepicker,
    NumberInputComponent,
    DurationComponent,
    CORE_DIRECTIVES,
    FORM_DIRECTIVES,
    ROUTER_DIRECTIVES
  ],
  template: template,
  styles: [style]
})
export class SettingsComponent implements AfterViewInit {

  settings: IConfig = new Config();
  goal: Goal = new Goal();
  donation: Donation = new Donation();

  committedHour: number = 2;
  committedMin: number = 0;

  public isMeridian: boolean = true;
  public timeInterval: number = 15;
  public timeFormat: string = this.formats[0];

  @ViewChild('hours') hours: NumberInputComponent;

  haveDonations(): boolean {
    return this.goal.count > 0;
  }

  handleMinOverflow(val: number): void {
    if (val < 0) {
      this.hours.subtract(Math.abs(val));
    } else {
      this.hours.add(val);
    }
  }

  handleTimeFormatChange(evt): void {
    this.isMeridian = evt.target.value === this.formats[0];
  }

  handleDonation(evt): void {
    this.goal.addDonation(new Donation(numberConverter(this.donation.amount), this.donation.user));
    this.donation = new Donation();
  }

  ngAfterViewInit() {
    console.log('view init');
  }

  get intervals() {
    return intervals;
  }
  get formats() {
    return formats;
  }

  // TODO(djw): Remove this when we're done testing
  get diagnostic() {
    return JSON.stringify({
      settings: JSON.stringify(this.settings),
      goal: JSON.stringify(this.goal),
    });
  }

}

