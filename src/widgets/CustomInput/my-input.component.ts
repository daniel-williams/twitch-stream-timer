import {Component, OnInit, Input, Self} from 'angular2/core';
import {ControlValueAccessor, NgClass, NgModel} from 'angular2/common';

const noop = () => { return void (0); };

// NOTE: required for form validation (add to providers)
// const MY_INPUT_CVA = new Provider(
//   NG_VALUE_ACCESSOR, {
//     useExisting: forwardRef(() => CustomInput),
//     multi: true
//   });

@Component({
  selector: 'my-input[ngModel]',
  template: `
      <div class='form-group'>
        <label><ng-content></ng-content>
          <input class='form-control'
                 [(ngModel)]='value'
                 (blur)='onTouched()'>
        </label>
      </div>
  `,
  directives: [NgClass],
  // providers: [MY_INPUT_CVA]
})
export class MyInput implements ControlValueAccessor, OnInit {
  public cd: NgModel;

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

  public constructor( @Self() cd: NgModel) {
    this.cd = cd;
    cd.valueAccessor = this;
  }

  ngOnInit() {
    console.log('init components with default value');
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
