import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

export let BASE_URL = '';

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:3080';
} else {
  BASE_URL = 'https://book-tracker-app.herokuapp.com';
}
