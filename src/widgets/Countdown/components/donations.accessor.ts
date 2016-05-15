import {Directive, forwardRef, Provider} from 'angular2/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from 'angular2/common';

import {DonationsComponent} from './Donations.component';


const DONATION_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => DonationsAccessor),
  multi: true,
});

@Directive({
  selector: 'donations',
  host: {
    '(valueChange)': 'onChange($event)',
    '(blur)': 'onTouched()',
  },
  providers: [DONATION_VALUE_ACCESSOR],
})
export class DonationsAccessor implements ControlValueAccessor {
  onChange = (_) => { return void 0; };
  onTouched = () => { return void 0; };

  constructor(private host: DonationsComponent) {}

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
