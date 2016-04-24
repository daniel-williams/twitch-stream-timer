import {Component, AfterViewInit, ViewChild} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {NgForm} from 'angular2/common';
import {Timepicker} from 'ng2-bootstrap';

import {ICountdownConfig, CountdownConfig} from './countdown.config';
import {NumberDialComponent} from './number-dial.component';
import {numberConverter} from '../../utils/TypeConverters';


class Donation {
  amount: number;
  user: string;

  constructor(amount?: number, user?: string) {
    this.amount = amount;
    this.user = user;
  }
}
class Goal {
  targetAmount: number;
  private donations: Donation[];

  constructor(targetAmount?: number) {
    this.targetAmount = targetAmount || 20;
    this.donations = [];
  }

  get count(): number {
    return this.donations.length;
  }
  get currentAmount(): number {
    return this.donations.reduce((total, item) => {
      total += item.amount;
      return total;
    }, 0);
  }

  addDonation(donation: Donation): void {
    if (!donation
      || typeof donation.amount !== 'number'
      || donation.amount <= 0
      || !donation.user
    ) {
      return;
    }
    this.donations.push(donation);
  }
  getDonations(): Donation[] {
    return this.donations;
  }

  reachedGoal(): boolean {
    return this.currentAmount >= this.targetAmount;
  }
}


// webpack imports
let template = require('./countdown-settings.component.html');
let style = require('./countdown-settings.component.scss');


@Component({
  selector: 'countdown-settings',
  directives: [
    Timepicker,
    NumberDialComponent,
    CORE_DIRECTIVES,
    FORM_DIRECTIVES,
    ROUTER_DIRECTIVES
  ],
  template: template,
  styles: [style]
})
export class CountdownSettingsComponent implements AfterViewInit {

  settings: ICountdownConfig = new CountdownConfig();
  goal: Goal = new Goal();
  donation: Donation = new Donation();

  committedHour: number = 2;
  committedMin: number = 0;

  public options: any = {
    minuteInterval: [1, 5, 10, 15, 30, 45, 60],
    timeFormat: ['2:00 PM', '14:00']
  };
  public isMeridian: boolean = true;
  public minuteInterval: number = 15;
  public timeFormat: string = this.options.timeFormat[0];

  submitted: boolean = false;
  @ViewChild('hours') hours: NumberDialComponent;

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

  handleTimeFormatChange(val): void {
    this.isMeridian = val === this.options.timeFormat[0];
  }

  handleDonation(evt): void {
    this.goal.addDonation(new Donation(numberConverter(this.donation.amount), this.donation.user));
    this.donation = new Donation();
  }

  ngAfterViewInit() {
    console.log('hours:', this.hours);
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify({
      settings: JSON.stringify(this.settings),
      goal: JSON.stringify(this.goal),
    });
  }

}

