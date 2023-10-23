import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-twitter-callback',
  template: `

  `
})
export class TwitterCallbackComponent implements OnInit {
  isLoading = true;
  errorMessage: string | null = null;
  oauthVerifier: string=''

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const oauthToken = params['oauth_token'];
      const oauthVerifier = params['oauth_verifier'];
      this.oauthVerifier = oauthVerifier

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
}
