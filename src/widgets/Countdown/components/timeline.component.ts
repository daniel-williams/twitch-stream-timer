import {Component, Input, OnInit, OnDestroy} from 'angular2/core';
import {NgClass, NgStyle} from 'angular2/common';

import {Config} from '../Config';


let template = require('./Timeline.component.html');
let style = require('./Timeline.component.scss');

const MILLIS_PER_SECOND: number = 1000;
const MILLIS_PER_MINUTE: number = MILLIS_PER_SECOND * 60;
const MILLIS_PER_HOUR: number = MILLIS_PER_MINUTE * 60;
let countdownTimer = null;

@Component({
  selector: 'timeline',
  template: template,
  styles: [style],
  host: {
    '[class.timeline]': 'true',
  }
})
export class TimelineComponent implements OnInit, OnDestroy {
  @Input() config: Config;
  @Input() progress: number;

  private now: Date;
  private startTime: Date;
  private minEndTime: Date;
  private maxEndTime: Date;

  private isBeforeStream: boolean = false;
  private isStreaming: boolean = false;
  private isNotStreaming: boolean = false;
  private isAfterStream: boolean = false;

  private status: string = '';

  ngOnInit() {
    countdownTimer = setInterval(this.tick.bind(this), 1000);
  }
  ngOnDestroy() {
    if (countdownTimer !== null) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
  }

  getTimelineStyle() {
    return {
      height: this.config.widgetHeight + 'px',
      backgroundColor: this.config.backgroundColor,
    };
  }

  getSegmentsWrapStyle() {
    let h = this.config.timelineHeight + 'px';
    return {
      height: h,
      lineHeight: h,
    };
  }

  getElapsedStyle() {
    let span = this.now.getTime() - this.startTime.getTime();
    let w = this.isStreaming
     ? (span / this.config.maxMilliseconds * 100) + '%'
     : 0;

    return {
      width: w,
      backgroundColor: this.config.elapsedBgColor,
    };
  }

  getMinStyle() {
    let span = this.minEndTime.getTime() - this.startTime.getTime();
    let w = this.isStreaming
      ? (span / this.config.maxMilliseconds * 100) + '%'
      : 0;

    return {
      width: w,
      backgroundColor: this.config.minBgColor,
    };
  }

  getMaxStyle() {
    return {
      backgroundColor: this.config.maxBgColor,
    };
  }

  getStatusStyle() {
    let style = {};
    if (this.isStreaming) {
      let p = (this.now.getTime() - this.startTime.getTime()) / this.config.maxMilliseconds * 100;
      if (p < 50) {
        style['marginLeft'] = p + '%';
      } else {
        style['marginRight'] = (100 - p) + '%';
      }
    } else {
      style['text-align'] = 'center';
    }
    return style;
  }


  private tick() {
    this.now = new Date();
    this.startTime = this.config.startTime;
    this.maxEndTime = new Date(this.startTime.getTime() + this.config.maxMilliseconds);

    let goalSpan = Math.max(0,
      this.maxEndTime.getTime() -
      (this.startTime.getTime() + this.config.minMilliseconds)) * this.progress;
    this.minEndTime = new Date(this.startTime.getTime() + this.config.minMilliseconds + goalSpan);

    this.isBeforeStream = this.now < this.startTime;
    this.isStreaming = this.now >= this.config.startTime && this.now <= this.minEndTime;
    this.isNotStreaming = !this.isStreaming;
    this.isAfterStream = this.now > this.minEndTime;

    this.status = this.isBeforeStream
      ? 'Stream starting in ' + this.labelFromMilliseconds(
        Math.max(this.startTime.getTime() - this.now.getTime(), 0))
      : this.isStreaming
        ? this.labelFromMilliseconds(
          Math.max(this.minEndTime.getTime() - this.now.getTime(), 0))
        : 'Thank you for watching!';
  }


  private labelFromMilliseconds(delta: number): string {
    let hours = Math.floor(delta / MILLIS_PER_HOUR);
    delta -= hours * MILLIS_PER_HOUR;
    let minutes = Math.floor(delta / MILLIS_PER_MINUTE);
    delta -= minutes * MILLIS_PER_MINUTE;
    let seconds = Math.floor(delta / MILLIS_PER_SECOND);

    let sLabel = hours || minutes || seconds
      ? seconds + 's'
      : '';
    let mLabel = hours || minutes
      ? minutes + 'm'
      : '';
    let hLabel = hours
      ? hours + 'h'
      : '';

    return `${hLabel} ${mLabel} ${sLabel}`;
  }


}
