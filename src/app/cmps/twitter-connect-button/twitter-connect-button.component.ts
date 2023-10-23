import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../../services/twitter.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-twitter-connect-button',
  templateUrl: './twitter-connect-button.component.html',
  styleUrls: ['./twitter-connect-button.component.scss'],
})
export class TwitterConnectButtonComponent implements OnInit {
  isLoading = false;
  errorMessage: string | null = null;
  oauth_verifier: string = '';

  resource_owner_key: string = '';
  resource_owner_secret: string = '';

  constructor(
    private twitterService: TwitterService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // if (this.oauth_verifier) {
    //   console.log('yes');
    //   this.twitterService
    //     .getAccess(
    //       this.resource_owner_key,
    //       this.resource_owner_secret,
    //       this.oauth_verifier
    //     )
    //     .subscribe(
    //       (response) => {
    //         console.log('response:', response);
    //       },
    //       (error) => {
    //         console.log('error:', error);
    //       }
    //     );
    // } else {
    //   console.log('no');
    // }
    this.route.queryParams.subscribe((params) => {
      const oauthToken = params['oauth_token'];
      const oauthVerifier = params['oauth_verifier'];
      this.oauth_verifier = oauthVerifier;

      // Handle oauthToken and oauthVerifier here
      // You can send them to your backend API for further processing
      // or use them directly in your frontend application

      // For example, you can store them in Angular service or local storage

      // For demonstration purposes, just log them
      console.log('OAuth Token:', oauthToken);
      console.log('OAuth Verifier:', oauthVerifier);

      // Update the component state to indicate loading is finished
      this.isLoading = false;
    });
  }

  connectWithTwitter(): void {
    console.log('click from cmp');
    this.twitterService.TwitterAuthentication().subscribe(
      (response) => {
        console.log('response:', response);
        console.log(response.re_owner_key);
        console.log(response.re_owner_secret);
        this.resource_owner_key = response.re_owner_key;
        this.resource_owner_secret = response.re_owner_secret;

        // sessionStorage.setItem('oauth_verifier', this.oauth_verifier);
        sessionStorage.setItem('resource_owner_key', this.resource_owner_key);
        sessionStorage.setItem(
          'resource_owner_secret',
          this.resource_owner_secret
        );

        const twitterUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=${response.re_owner_key}`;
        window.location.href = twitterUrl;
      },
      (error) => {
        console.log('error:', error);
      }
    );
  }

  Twitter(): void {
    // const oauth_verifier = sessionStorage.getItem('oauth_verifier');
    const resource_owner_key = sessionStorage.getItem('resource_owner_key');
    const resource_owner_secret = sessionStorage.getItem(
      'resource_owner_secret'
    );

    // if (this.oauth_verifier) {
    //   console.log(this.oauth_verifier ,resource_owner_key, resource_owner_secret);
    // } else {
    //   console.log('no');
    // }
    // console.log('this.resource_owner_secret',this.resource_owner_secret);
    // console.log('this.resource_owner_secret',this.resource_owner_secret);
    if (this.oauth_verifier) {
      console.log('yes');
      this.twitterService
        .getAccess(
          resource_owner_key!,
          resource_owner_secret!,
          this.oauth_verifier
        )
        .subscribe(
          (response) => {
            console.log('response:', response);
          },
          (error) => {
            console.log('error:', error);
          }
        );
    } else {
      console.log('no');
    }
  }
}
