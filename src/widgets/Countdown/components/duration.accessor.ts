import {Host, Input, Output, EventEmitter} from 'angular2/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from 'angular2/common';
import {Directive, forwardRef, Provider} from 'angular2/core';
import {DurationComponent} from './duration.component';

const DURATION_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => DurationAccessor), multi: true});

@Directive({
  selector: 'duration',
  host: {
    '(valueChange)': 'onChange($event)',
    '(blur)': 'onTouched()'
  },
  providers: [DURATION_ACCESSOR]
})
export class DurationAccessor implements ControlValueAccessor {
  onChange = (_) => { return void(0); };
  onTouched = () => { return void(0); };

  constructor(private host: DurationComponent) {
  }

  writeValue(value: any): void {
    this.host.setValue(value);
  }

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
