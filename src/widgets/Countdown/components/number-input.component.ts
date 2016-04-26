import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

import {booleanConverter, numberConverter} from '../../../utils/TypeConverters';

// webpack imports
let template = require('./number-input.component.html');
let style = require('./number-input.component.scss');

@Component({
  selector: 'number-input',
  directives: [FORM_DIRECTIVES],
  template: template,
  styles: [style]
})
export class NumberInputComponent {

  @Input() value: number = 0;
  @Input() interval: number = 1;
  @Input() min: number = 0;
  @Input() max: number = Infinity;
  @Input() canOverflow: boolean = true;

  @Output() change: EventEmitter<number> = new EventEmitter(false);
  @Output() overflow: EventEmitter<number> = new EventEmitter(false);

  ngOnInit() {
    this.canOverflow = booleanConverter(this.canOverflow);
  }

  add(theValue?: number) {
    let delta: IValueDelta =
      this.adjustForLimits(this.value + (theValue || numberConverter(this.interval)));

    this.value = delta.value;
    this.handleOverflow(delta);
  }
  subtract(theValue?: number) {
    let delta: ValueDelta =
      this.adjustForLimits(this.value - (theValue || numberConverter(this.interval)));

    this.value = delta.value;
    this.handleOverflow(delta);
  }

  adjustForLimits(theValue: number): IValueDelta {
    let delta = new ValueDelta();

    if (theValue > this.max) {
      if (this.canOverflow === true) {
        delta.overflow = 1;
        delta.value = (this.min + theValue - this.max) - 1;
      } else {
        delta.value = this.max;
      }
    } else if (theValue < this.min) {
      if (this.canOverflow === true) {
        delta.overflow = -1;
        delta.value = (this.max + this.min + theValue) + 1;
      } else {
        delta.value = this.min;
      }
    } else {
      delta.value = theValue;
    }
    return delta;
  }



  handleKeyup(evt) {
    evt.preventDefault();
    let num = parseInt(evt.target.value, 10);
    if (!isNaN(num)) {
      this.value = num;
    }
    evt.target.value = this.value;
  }

  handleChange(evt) {
    console.log('number input change');
    evt.preventDefault();
    let num = parseInt(evt.target.value, 10);
    if (!isNaN(num)) {
      this.change.emit(num);
    }
  }

  handleOverflow(delta: IValueDelta) {
    if (this.canOverflow && delta.overflow) {
      this.overflow.emit(delta.overflow);
    }
  }

}

interface IValueDelta {
  value: number;
  overflow: number;
}
class ValueDelta implements IValueDelta {
  public value: number;
  public overflow: number;
  constructor(value?: number, overflow?: number) {
    this.value = value || 0;
    this.overflow = overflow || 0;
  }
}

