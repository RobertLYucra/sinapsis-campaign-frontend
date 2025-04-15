import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { MainModule } from './main/main.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getCustomPaginatorIntl } from './material/material.utils';

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        MainModule], providers: [{ provide: MatPaginatorIntl, useValue: getCustomPaginatorIntl() }, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
