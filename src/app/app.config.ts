import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  
  providers: [provideRouter(routes),importProvidersFrom(HttpClientModule), provideAnimations(),
  BrowserAnimationsModule],
};
