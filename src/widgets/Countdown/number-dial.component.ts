import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

import {booleanConverter, numberConverter} from '../../utils/TypeConverters';

// webpack imports
let template = require('./number-dial.component.html');
let style = require('./number-dial.component.scss');

@Component({
  selector: 'number-dial',
  directives: [FORM_DIRECTIVES],
  template: template,
  styles: [style]
})
export class NumberDialComponent {

  @Input() value: number = 0;
  @Input() interval: number = 1;
  @Input() min: number = 0;
  @Input() max: number = 59;
  @Input() canOverflow: boolean = true;

  @Output() overflow: EventEmitter<number> = new EventEmitter(false);

  ngOnInit() {
    this.canOverflow = booleanConverter(this.canOverflow);
  }

  add(theValue?: number) {
    let delta: IValueDelta = this.adjustForLimits(this.value + (theValue || this.interval));

    this.value = delta.value;
    this.handleOverflow(delta);
  }
  subtract(theValue?: number) {
    let delta: ValueDelta = this.adjustForLimits(this.value - (theValue || this.interval));

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

  handleOverflow(delta: IValueDelta) {
    if (this.canOverflow && delta.overflow) {
      this.overflow.emit(delta.overflow);
    }
  }

  handleKeyup(evt) {
    let num = parseInt(evt.target.value, 10);
    if (isNaN(num)) {
      evt.target.value = this.value;
    } else {
      this.value = num;
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

