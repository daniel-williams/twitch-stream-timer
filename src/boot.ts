import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';


bootstrap(AppComponent, [])
  .catch(error => console.log(error));

