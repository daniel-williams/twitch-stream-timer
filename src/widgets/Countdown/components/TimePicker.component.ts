import {Component, EventEmitter, Input, Output} from 'angular2/core';


let template = require('./TimePicker.component.html');
let style = require('./TimePicker.component.scss');

@Component({
  selector: 'timepicker',
  template: template,
  styles: [style]
})
export class TimePicker {
  @Output() valueChange: EventEmitter<Date>;
  @Output() blur: EventEmitter<any>;

  @Input() interval: number = 15;

  private value: Date;
  private hours: string;
  private minutes: string;
  private meridian: string;

  constructor() {
    this.valueChange = new EventEmitter();
    this.blur = new EventEmitter();
  }

  setValue(v: any) {
    if (v === this.value) { return; }
    if (v instanceof Date) {
      this.value = v;
    } else {
      this.value = new Date(v);
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
    this.value.setHours(this.value.getHours() + 1);
    this.modelToViewUpdate();
    this.valueChange.emit(this.value);
  }
  private handleSubtractHours() {
    this.value.setHours(this.value.getHours() - 1);
    this.modelToViewUpdate();
    this.valueChange.emit(this.value);
  }
  private handleAddMinutes() {
    this.value.setMinutes(this.value.getMinutes() + this.interval);
    this.modelToViewUpdate();
    this.valueChange.emit(this.value);
  }
  private handleSubtractMinutes() {
    this.value.setMinutes(this.value.getMinutes() - this.interval);
    this.modelToViewUpdate();
    this.valueChange.emit(this.value);
  }


  private handleHoursKeyup(evt) {
    let h = parseInt(this.hours, 10);
    if (!isNaN(h)) {
      if (h < 1) {
        this.hours = '01';
      } else if (h > 12) {
        this.hours = '12';
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

  private toggleMeridian() {
    let h = this.value.getHours();
    if (h < 12) {
      h += 12;
    } else {
      h -= 12;
    }
    this.value.setHours(h);
    this.modelToViewUpdate();
    this.valueChange.emit(this.value);
  }

  private viewToModelUpdate() {
    let h = parseInt(this.hours, 10);
    let m = parseInt(this.minutes, 10);
    if (isNaN(h) || isNaN(m)) {
      this.modelToViewUpdate();
    } else {
      let d = new Date();
      d.setHours(h);
      d.setMinutes(m);
      this.value = d;
      this.valueChange.emit(this.value);
    }
  }

  private modelToViewUpdate() {
    if (!this.value || !(this.value instanceof Date)) {
      this.value = new Date();
    } else {
      // ensure value is for today
      let now = new Date();
      if (this.value.getDate() !== now.getDate()) {
        this.value.setDate(now.getDate());
      }
    }

    let h = this.value.getHours();
    if (h > 12) {
      h = h - 12;
    }
    if (h === 0) {
      h = 12;
    }
    this.hours = this.pad(h);

    let m = this.value.getMinutes();
    this.minutes = this.pad(m);

    this.meridian = this.value.getHours() >= 12 ? 'PM' : 'AM';
  }

  private pad(value: string|number): string {
    return (value.toString().length < 2)
      ? '0' + value
      : value.toString();
  }

}
