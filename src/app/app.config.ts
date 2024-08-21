import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import { provideRouter} from '@angular/router';

import {InMemoryDataService} from "./services/in-memory-data.service";

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(),
    importProvidersFrom([HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false})]),
    provideRouter(routes)]
};
