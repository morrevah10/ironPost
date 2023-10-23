import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TwitterService } from '../../src/app/services/twitter.service';
import { TwitterConnectButtonComponent } from './cmps/twitter-connect-button/twitter-connect-button.component';
import { TwitterCallbackComponent } from './cmps/twitter-callback/twitter-callback.component';

@NgModule({
  declarations: [
    AppComponent,
    TwitterConnectButtonComponent,
    TwitterCallbackComponent
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
