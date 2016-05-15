import {Directive, forwardRef, Provider} from 'angular2/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from 'angular2/common';

import {TimePicker} from './TimePicker.component';


const TIMEPICKER_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => TimePickerAccessor),
  multi: true,
});

@Directive({
  selector: 'timepicker',
  host: {
    '(valueChange)': 'onChange($event)',
    '(blur)': 'onTouched()'
  },
  providers: [TIMEPICKER_VALUE_ACCESSOR]
})
export class TimePickerAccessor implements ControlValueAccessor {
  onChange = (_) => { return void(0); };
  onTouched = () => { return void(0); };

  constructor(private host: TimePicker) {}

  writeValue(value: any): void {
    this.host.setValue(value);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
