import {Host, Input, Output, EventEmitter} from 'angular2/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from 'angular2/common';
import {Directive, forwardRef, Provider} from 'angular2/core';
import {WrappedInput} from './wrapped-input.component';

const WRAPPED_INPUT_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => WrappedInputAccessor), multi: true});

@Directive({
  selector: 'wrapped-input',
  host: {
    '(valueChange)': 'onChange($event)',
    '(blur)': 'onTouched()'
  },
  providers: [WRAPPED_INPUT_ACCESSOR]
})
export class WrappedInputAccessor implements ControlValueAccessor {
  onChange = (_) => { return void(0); };
  onTouched = () => { return void(0); };

  constructor(private host: WrappedInput) {
  }

  writeValue(value: any): void {
    console.log('writeValue', value);
    this.host.setValue(value);
  }

  registerOnChange(fn: (_: any) => void): void {
    console.log('regChange', fn);
    this.onChange = fn; }
  registerOnTouched(fn: () => void): void {
    console.log('regTouched', fn);
    this.onTouched = fn; }
}
