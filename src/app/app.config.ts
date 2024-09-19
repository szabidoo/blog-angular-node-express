import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  /*
    - A provideAnimationsAsync duplikálva volt a providers tömbben
    - A provideHttpClient(withFetch()) biztosítha, hogy a HttpClient elérhető legyen
      már az AppComponent-ben, és így nem kell külön provide-olni ott a használt
      service-eket. A withFetch()-et az angular ajánlja azokhoz az alkalmazásokhoz,
      amik server side rendering-et használnak (és asszem a 17-es Angular-tól)
      már ez a default (vidd rá az egeret a provideHttpClient-re és akkor látsz
      további magyarázatot). 
  */
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideHttpClient(withFetch())]
};
