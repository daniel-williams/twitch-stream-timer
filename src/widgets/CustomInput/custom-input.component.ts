import {Component, Provider, forwardRef} from 'angular2/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, CORE_DIRECTIVES} from 'angular2/common';

const noop = () => { return void(0); };

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(
  NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => CustomInput),
    multi: true
  });

@Component({
  selector: 'custom-input',
  template: `
      <div class='form-group'>
        <label><ng-content></ng-content>
          <input class='form-control'
                 [(ngModel)]='value'
                 (blur)='onTouched()'>
        </label>
      </div>
  `,
  directives: [CORE_DIRECTIVES],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CustomInput implements ControlValueAccessor {

    //The internal data model
    private _value: any = '';

    //Placeholders for the callbacks
    private _onChangeCallback: (_: any) => void = noop;
    private _onTouchedCallback: () => void = noop;

    //get accessor
    get value(): any { return this._value; };

    //set accessor including call the onchange callback
    set value(v: any) {
      if (v !== this._value) {
        this._value = v;
        this._onChangeCallback(v);
      }
    }

    //Set touched on blur
    onTouched() {
      this._onTouchedCallback();
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
      this._value = value;
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
      this._onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
      this._onTouchedCallback = fn;
    }

}
