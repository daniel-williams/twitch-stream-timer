import {Component, Input, OnInit, OnDestroy} from 'angular2/core';
import {NgClass, NgStyle} from 'angular2/common';

import {Config} from '../Config';


let template = require('./timeline.component.html');
let style = require('./timeline.component.scss');

const MILLIS_PER_SECOND: number = 1000;
const MILLIS_PER_MINUTE: number = MILLIS_PER_SECOND * 60;
const MILLIS_PER_HOUR: number = MILLIS_PER_MINUTE * 60;
let countdownTimer = null;

@Component({
  selector: 'timeline',
  template: template,
  styles: [style],
})
export class TimelineComponent implements OnInit, OnDestroy {
  @Input() config: Config;

  private now: Date;
  private startTime: Date;
  private minEndTime: Date;
  private maxEndTime: Date;

  private isBeforeStream: boolean = false;
  private isStreaming: boolean = false;
  private isNotStreaming: boolean = false;
  private isAfterStream: boolean = false;

  private timeUntilStream: string = '';
  private timeStreaming: string = '';
  private timeRemaining: string = '';

  ngOnInit() {
    countdownTimer = setInterval(this.tick.bind(this), 1000);
  }
  ngOnDestroy() {
    if (countdownTimer !== null) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
  }

  getElapsedStyle() {
    let h = this.config.minHeight + 'px';
    let elapsed = this.now.getTime() - this.startTime.getTime();

    let w = this.isStreaming
     ? (elapsed / this.config.maxTime * 100) + '%'
     : 0;
    return {
      left: 0,
      height: h,
      width: w,
      lineHeight: h,
      backgroundColor: this.config.elapsedTimelineColor,
    };
  }

  getMaxStyle() {
    let h = this.config.minHeight + 'px';
    return {
      lineHeight: h,
      height: h,
      width: 0,
    };
  }

  getMinStyle() {
    let h = this.config.minHeight + 'px';
    return {
      lineHeight: h,
      height: h,
      width: 0,
    };
  }



  private tick() {
    this.now = new Date();
    this.startTime = this.config.startTime;
    this.minEndTime = new Date(this.now.getTime() + this.config.endTime);
    this.maxEndTime = new Date(this.now.getTime() + this.config.maxTime);

    this.isBeforeStream = this.now < this.startTime;
    this.isStreaming = this.now >= this.config.startTime && this.now <= this.minEndTime;
    this.isNotStreaming = !this.isStreaming;
    this.isAfterStream = this.now > this.minEndTime;

    // this.timeUntilStream = this.isBeforeStream
    //   ? this.timeFromMilliseconds(Math.abs(this.startTime.getTime() - this.now.getTime()))
    //   : '';
    this.timeStreaming = this.isStreaming
      ? this.timeFromMilliseconds(Math.abs(this.now.getTime() - this.startTime.getTime()))
      : '';
    // this.timeRemaining = this.isStreaming
    //   ? this.timeFromMilliseconds(Math.abs(this.minEndTime.getTime() - this.now.getTime()))
    //   : '';
  }


  private timeFromMilliseconds(delta: number): string {
    let hours = Math.floor(delta / MILLIS_PER_HOUR);
    delta -= hours * MILLIS_PER_HOUR;
    let minutes = Math.floor(delta / MILLIS_PER_MINUTE);
    delta -= minutes * MILLIS_PER_MINUTE;
    let seconds = Math.floor(delta / MILLIS_PER_SECOND);
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(value: string|number): string {
    return (value.toString().length < 2)
      ? '0' + value
      : value.toString();
  }
}
