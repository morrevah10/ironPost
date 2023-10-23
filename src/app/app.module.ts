import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TwitterService } from '../../src/app/services/twitter.service';
import { TwitterConnectButtonComponent } from './cmps/twitter-connect-button/twitter-connect-button.component';

@NgModule({
  declarations: [
    AppComponent,
    TwitterConnectButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [TwitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
