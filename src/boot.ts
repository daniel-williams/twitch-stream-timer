import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {LocationStrategy, APP_BASE_HREF} from 'angular2/platform/common';
import {AppComponent} from './app.component';


bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, {useValue: '/'})
]).catch(error => console.log(error));

