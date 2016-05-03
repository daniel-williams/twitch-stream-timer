import {Component, EventEmitter, Input, Output} from 'angular2/core';


let template = require('./duration.component.html');
let style = require('./duration.component.scss');

let MILLIS_PER_MINUTE = (60 * 1000);
let MILLIS_PER_HOUR = (60 * MILLIS_PER_MINUTE);

@Component({
  selector: 'duration',
  template: template,
  styles: [style]
})
export class DurationComponent {
  @Output() valueChange: EventEmitter<number>;
  @Output() blur: EventEmitter<any>;

  @Input() interval: number = 15;

  private milliseconds: number;
  private hours: string;
  private minutes: string;

  constructor() {
    this.valueChange = new EventEmitter();
    this.blur = new EventEmitter();
  }

  setValue(v: any) {
    if (v === this.milliseconds) { return; }
    if (typeof v === 'number') {
      this.milliseconds = v;
    } else {
      let n = parseInt(v, 10);
      if (!isNaN(n)) {
        this.milliseconds = n;
      }
    }
    this.modelToViewUpdate();
  }

  private handleHoursBlur(): void {
    this.hours = this.pad(this.hours);
    this.blur.emit(void 0);
  }
  private handleMinutesBlur(): void {
    this.minutes = this.pad(this.minutes);
    this.blur.emit(void 0);
  }

  private handleAddHours() {
    this.milliseconds += MILLIS_PER_HOUR;
    this.modelToViewUpdate();
    this.valueChange.emit(this.milliseconds);
  }
  private handleSubtractHours() {
    this.milliseconds -= MILLIS_PER_HOUR;
    this.modelToViewUpdate();
    this.valueChange.emit(this.milliseconds);
  }
  private handleAddMinutes() {
    this.milliseconds += MILLIS_PER_MINUTE * this.interval;
    this.modelToViewUpdate();
    this.valueChange.emit(this.milliseconds);
  }
  private handleSubtractMinutes() {
    this.milliseconds -= MILLIS_PER_MINUTE * this.interval;
    this.modelToViewUpdate();
    this.valueChange.emit(this.milliseconds);
  }

  private handleHoursKeyup(evt) {
    let h = parseInt(this.hours, 10);
    if (!isNaN(h)) {
      if (h < 0) {
        this.hours = '00';
      }
    }
    this.viewToModelUpdate();
  }
  private handleMinutesKeyup(evt) {
    let m = parseInt(this.minutes, 10);
    if (!isNaN(m)) {
      if (m > 59) {
        this.minutes = '59';
      } else if (m < 0) {
        this.minutes = '00';
      }
    }
    this.viewToModelUpdate();
  }

  private viewToModelUpdate() {
    let h = parseInt(this.hours, 10);
    let m = parseInt(this.minutes, 10);
    if (isNaN(h) || isNaN(m)) {
      this.modelToViewUpdate();
    } else {
      this.milliseconds = (h * MILLIS_PER_HOUR) + (m * MILLIS_PER_MINUTE);
      this.valueChange.emit(this.milliseconds);
    }
  }

  private modelToViewUpdate() {
    if (this.milliseconds < 0) { this.milliseconds = 0; }

    let h = Math.floor(this.milliseconds / MILLIS_PER_HOUR);
    this.hours = this.pad(h);

    let m = Math.floor((this.milliseconds - (h * MILLIS_PER_HOUR)) / MILLIS_PER_MINUTE);
    this.minutes = this.pad(m);
  }

  private pad(value: string|number): string {
    return (value.toString().length < 2)
      ? '0' + value
      : value.toString();
  }
}
