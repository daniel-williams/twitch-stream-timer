import {OpaqueToken} from 'angular2/core';
export let COUNTDOWN_CONFIG = new OpaqueToken('countdown.config');


export interface IConfig {
  timelineHeight?: number;
  widgetHeight?: number;

  backgroundColor?: string;

  elapsedBgColor?: string;
  minBgColor?: string;
  maxBgColor?: string;

  startTime?: Date;
  minMilliseconds?: number;
  maxMilliseconds?: number;
}

const Defaults: IConfig = {
  timelineHeight: 25,
  widgetHeight: 50,

  backgroundColor: '04ff02',
  elapsedBgColor: 'ffea02',
  minBgColor: 'ff7102',
  maxBgColor: '04ff02',
};

export class Config implements IConfig {
  timelineHeight: number;
  widgetHeight: number;

  backgroundColor: string;

  elapsedBgColor: string;
  minBgColor: string;
  maxBgColor: string;

  startTime: Date;
  minMilliseconds: number;
  maxMilliseconds: number;

  constructor(options?: IConfig) {
    options = Object.assign({}, Defaults, options || {});
    let now = new Date();

    this.timelineHeight = options.timelineHeight;
    this.widgetHeight = options.widgetHeight;

    this.backgroundColor = options.backgroundColor;
    this.maxBgColor = options.maxBgColor;
    this.minBgColor = options.minBgColor;
    this.elapsedBgColor = options.elapsedBgColor;

    this.startTime = options.startTime || now;
    this.minMilliseconds = options.minMilliseconds || 1000 * 60 * 60 * 2;
    this.maxMilliseconds = options.maxMilliseconds || 1000 * 60 * 60 * 4;
  }
}

