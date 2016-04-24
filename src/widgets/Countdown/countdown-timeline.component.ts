import {Component} from 'angular2/core';


let template = require('./countdown-timeline.component.html');
let style = require('./countdown-timeline.component.scss');

@Component({
  selector: 'countdown-timeline',
  template: template,
  styles: [style],
})
export class CountdownTimelineComponent {
}
