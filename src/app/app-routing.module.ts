import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TwitterConnectButtonComponent } from './cmps/twitter-connect-button/twitter-connect-button.component';
import { TwitterCallbackComponent } from './cmps/twitter-callback/twitter-callback.component';

const routes: Routes = [
  { path: '', component: TwitterConnectButtonComponent },
  { path: 'callback', component: TwitterCallbackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
