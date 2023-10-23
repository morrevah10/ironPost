import { Component } from '@angular/core';
import { TwitterService } from '../../services/twitter.service'


@Component({
  selector: 'app-twitter-connect-button',
  templateUrl: './twitter-connect-button.component.html',
  styleUrls: ['./twitter-connect-button.component.scss']
})
export class TwitterConnectButtonComponent {

  constructor(private twitterService: TwitterService) {}

  // connectWithTwitter(): void {
  //   console.log('click')
  //   // this.twitterService.startTwitterAuthentication();
  // }


  connectWithTwitter(): void {
    // Step 1: Initiate Twitter authentication

    console.log('click')
    this.twitterService.initiateTwitterAuthentication().subscribe(response => {
      const { oauthToken, oauthTokenSecret } = response;
      
      // Step 2: Complete Twitter authentication with received OAuth tokens
      this.twitterService.completeTwitterAuthentication(oauthToken, oauthTokenSecret).subscribe(user => {
        // Handle the user object returned from the Twitter authentication
        console.log('Twitter User:', user);
      }, error => {
        // Handle errors during Twitter authentication completion
        console.error('Twitter Authentication Error:', error);
      });
    }, error => {
      // Handle errors during Twitter authentication initiation
      console.error('Twitter Authentication Initiation Error:', error);
    });
  }
}


