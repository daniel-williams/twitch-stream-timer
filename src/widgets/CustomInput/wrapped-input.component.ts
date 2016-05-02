import {Component, EventEmitter, Input, Output} from 'angular2/core';


@Component({
  selector: 'wrapped-input',
  template: `
      <div class='form-group'>
        <label><ng-content></ng-content>
          <input class='form-control'
                 [(ngModel)]='value'
                 (blur)='onBlur($event)'
                 (keyup)='onKeyUp($event)'>
        </label>
      </div>
  `,
})
export class WrappedInput {

  @Output() valueChange: EventEmitter<string>;
  @Output() blur: EventEmitter<any>;

  value: string;

  constructor() {
    this.valueChange = new EventEmitter();
    this.blur = new EventEmitter();
  }

  setValue(value: string): void {
  	this.value = value;
  }

  onKeyUp(evt: any): void {
    let val = evt.target.value;
    this.valueChange.emit(val);
  }

  onBlur(evt): void {
    this.blur.emit(evt);
  }

}
