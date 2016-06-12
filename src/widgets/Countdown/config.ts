import {OpaqueToken} from 'angular2/core';
export let COUNTDOWN_CONFIG = new OpaqueToken('countdown.config');


export interface IConfig {
  timelineHeight?: number;
  widgetHeight?: number;

  foregroundColor?: string;
  backgroundColor?: string;

  elapsedBgColor?: string;
  minBgColor?: string;
  maxBgColor?: string;

  startTime?: Date;
  minMilliseconds?: number;
  maxMilliseconds?: number;

  preStreamMessage?: string;
  postStreamMessage?: string;
}

const Defaults: IConfig = {
  timelineHeight: 25,
  widgetHeight: 50,

  foregroundColor: '000000',
  backgroundColor: '04ff02',
  elapsedBgColor: 'ffea02',
  minBgColor: 'ff7102',
  maxBgColor: '04ff02',

  preStreamMessage: 'Stream starting in $timer',
  postStreamMessage: 'Thank you for watching!',
};

export class Config implements IConfig {
  timelineHeight: number;
  widgetHeight: number;

  foregroundColor: string;
  backgroundColor: string;

  elapsedBgColor: string;
  minBgColor: string;
  maxBgColor: string;

  startTime: Date;
  minMilliseconds: number;
  maxMilliseconds: number;

  preStreamMessage: string;
  postStreamMessage: string;

  constructor(options?: IConfig) {
    options = Object.assign({}, Defaults, options || {});
    let now = new Date();

    this.timelineHeight = options.timelineHeight;
    this.widgetHeight = options.widgetHeight;

    this.foregroundColor = options.foregroundColor;
    this.backgroundColor = options.backgroundColor;
    this.maxBgColor = options.maxBgColor;
    this.minBgColor = options.minBgColor;
    this.elapsedBgColor = options.elapsedBgColor;

    this.startTime = options.startTime || now;
    this.minMilliseconds = options.minMilliseconds || 1000 * 60 * 60 * 2;
    this.maxMilliseconds = options.maxMilliseconds || 1000 * 60 * 60 * 4;

    this.preStreamMessage = options.preStreamMessage;
    this.postStreamMessage = options.postStreamMessage;
  }
}

