import {Component, EventEmitter, Input, Output} from 'angular2/core';

import {Donation} from '../Donation';
import {numberConverter} from '../../../utils/TypeConverters';


let template = require('./donations.component.html');
let style = require('./donations.component.scss');

@Component({
  selector: 'donations',
  template: template,
  styles: [style],
})
export class DonationsComponent {
  @Output() valueChange: EventEmitter<number>;
  @Output() blur: EventEmitter<any>;

  donations: Donation[] = [];
  donation: Donation = new Donation();

  constructor() {
    this.valueChange = new EventEmitter();
    this.blur = new EventEmitter();
  }

  setValue(v: any) {
    this.donations = v;
  }

  private handleDonation(evt): void {
    let amount = numberConverter(this.donation.amount);
    if (amount > 0) {
      this.donations.push(new Donation(amount, this.donation.name));
      this.donation = new Donation();
    }
  }

  private handleRemove(item) {
    let idx = this.donations.length - 1;
    for (; idx >= 0; idx--) {
      if (this.donations[idx].amount === item.amount && this.donations[idx].name === item.name) {
        this.donations.splice(idx, 1);
      }
    }
  }
}
