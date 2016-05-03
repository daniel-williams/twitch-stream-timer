import {Directive, forwardRef, Provider} from 'angular2/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from 'angular2/common';

import {DurationComponent} from './duration.component';


const DURATION_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => DurationAccessor),
  multi: true,
});

@Directive({
  selector: 'duration',
  host: {
    '(valueChange)': 'onChange($event)',
    '(blur)': 'onTouched()'
  },
  providers: [DURATION_VALUE_ACCESSOR]
})
export class DurationAccessor implements ControlValueAccessor {
  onChange = (_) => { return void(0); };
  onTouched = () => { return void(0); };

  constructor(private host: DurationComponent) {}

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
