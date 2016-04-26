import {Component} from 'angular2/core';


let template = require('./timeline.component.html');
let style = require('./timeline.component.scss');

@Component({
  selector: 'timeline',
  template: template,
  styles: [style],
})
export class TimelineComponent {
}
