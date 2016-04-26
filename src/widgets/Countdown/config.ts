import {OpaqueToken} from 'angular2/core';
export let COUNTDOWN_CONFIG = new OpaqueToken('countdown.config');


export interface IConfig {
  minHeight?: string;
  maxHeight?: string;

  foregroundColor?: string;
  backgroundColor?: string;
  maxTimelineColor?: string;
  committedTimelineColor?: string;
  elapsedTimelineColor?: string;

  startTime?: Date;
  endTime?: Date;
  maxTime?: Date;
}

const Defaults: IConfig = {
  minHeight: '200px',
  maxHeight: '100px',

  foregroundColor: '#ffffff',
  backgroundColor: '#04ff02',
  maxTimelineColor: '#ff0203',
  committedTimelineColor: '#ff7102',
  elapsedTimelineColor: '#ffea02',
};

export class Config implements IConfig {
  minHeight: string;
  maxHeight: string;

  foregroundColor: string;
  backgroundColor: string;
  maxTimelineColor: string;
  committedTimelineColor: string;
  elapsedTimelineColor: string;

  startTime: Date;
  endTime: Date;
  maxTime: Date;

  constructor(options?: IConfig) {
    options = Object.assign({}, Defaults, options || {});
    let now = new Date();

    this.minHeight = options.minHeight;
    this.maxHeight = options.maxHeight;

    this.foregroundColor = options.foregroundColor;
    this.backgroundColor = options.backgroundColor;
    this.maxTimelineColor = options.maxTimelineColor;
    this.committedTimelineColor = options.committedTimelineColor;
    this.elapsedTimelineColor = options.elapsedTimelineColor;

    this.startTime = options.startTime || now;
    this.endTime = options.endTime || new Date(now.getTime() + 1000 * 60 * 60 * 2);
    this.maxTime = options.maxTime || new Date(now.getTime() + 1000 * 60 * 60 * 4);
  }
}

