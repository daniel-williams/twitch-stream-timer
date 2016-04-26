import {Component, Input, Output, ViewChild} from 'angular2/core';

import {NumberInputComponent} from './number-input.component';


let template = require('./duration.component.html');
let style = require('./duration.component.scss');

@Component({
  selector: 'duration',
  directives: [NumberInputComponent],
  template: template,
  styles: [style]
})
export class DurationComponent {

  @Input() hours: number = 2;
  @Input() minutes: number = 0;
  @Input() interval: number = 15;

  @ViewChild('hoursDial') hoursDial: NumberInputComponent;
  @ViewChild('minutesDial') minutesDial: NumberInputComponent;

  handleMinOverflow(val: number): void {
    if (val < 0) {
      this.hoursDial.subtract(Math.abs(val));
    } else {
      this.hoursDial.add(val);
    }
  }

  handleUpdates(evt) {
    console.log(`hours: ${this.hours}, minutes: ${this.minutes}`);
  }

}
