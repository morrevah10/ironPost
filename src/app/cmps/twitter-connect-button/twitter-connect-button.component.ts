import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../../services/twitter.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-twitter-connect-button',
  templateUrl: './twitter-connect-button.component.html',
  styleUrls: ['./twitter-connect-button.component.scss'],
})
// export class TwitterConnectButtonComponent implements OnInit {
//   isLoading = false;
//   errorMessage: string | null = null;
//   oauth_verifier: string = '';

//   resource_owner_key: string = '';
//   resource_owner_secret: string = '';

//   constructor(
//     private twitterService: TwitterService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     // if (this.oauth_verifier) {
//     //   console.log('yes');
//     //   this.twitterService
//     //     .getAccess(
//     //       this.resource_owner_key,
//     //       this.resource_owner_secret,
//     //       this.oauth_verifier
//     //     )
//     //     .subscribe(
//     //       (response) => {
//     //         console.log('response:', response);
//     //       },
//     //       (error) => {
//     //         console.log('error:', error);
//     //       }
//     //     );
//     // } else {
//     //   console.log('no');
//     // }
//     this.route.queryParams.subscribe((params) => {
//       const oauthToken = params['oauth_token'];
//       const oauthVerifier = params['oauth_verifier'];
//       this.oauth_verifier = oauthVerifier;

//       // Handle oauthToken and oauthVerifier here
//       // You can send them to your backend API for further processing
//       // or use them directly in your frontend application

//       // For example, you can store them in Angular service or local storage

//       // For demonstration purposes, just log them
//       console.log('OAuth Token:', oauthToken);
//       console.log('OAuth Verifier:', oauthVerifier);

//       // Update the component state to indicate loading is finished
//       this.isLoading = false;
//     });
//   }

//   connectWithTwitter(): void {
//     console.log('click from cmp');
//     this.twitterService.TwitterAuthentication().subscribe(
//       (response) => {
//         console.log('response:', response);
//         console.log(response.re_owner_key);
//         console.log(response.re_owner_secret);
//         this.resource_owner_key = response.re_owner_key;
//         this.resource_owner_secret = response.re_owner_secret;

//         // sessionStorage.setItem('oauth_verifier', this.oauth_verifier);
//         sessionStorage.setItem('resource_owner_key', this.resource_owner_key);
//         sessionStorage.setItem(
//           'resource_owner_secret',
//           this.resource_owner_secret
//         );

//         const twitterUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=${response.re_owner_key}`;
//         window.location.href = twitterUrl;
//       },
//       (error) => {
//         console.log('error:', error);
//       }
//     );
//   }

//   Twitter(): void {
//     // const oauth_verifier = sessionStorage.getItem('oauth_verifier');
//     const resource_owner_key = sessionStorage.getItem('resource_owner_key');
//     const resource_owner_secret = sessionStorage.getItem(
//       'resource_owner_secret'
//     );

//     // if (this.oauth_verifier) {
//     //   console.log(this.oauth_verifier ,resource_owner_key, resource_owner_secret);
//     // } else {
//     //   console.log('no');
//     // }
//     // console.log('this.resource_owner_secret',this.resource_owner_secret);
//     // console.log('this.resource_owner_secret',this.resource_owner_secret);
//     if (this.oauth_verifier) {
//       console.log('yes');
//       this.twitterService
//         .getAccess(
//           resource_owner_key!,
//           resource_owner_secret!,
//           this.oauth_verifier
//         )
//         .subscribe(
//           (response) => {
//             console.log('response:', response);
//           },
//           (error) => {
//             console.log('error:', error);
//           }
//         );
//     } else {
//       console.log('no');
//     }
//   }
// }

// ... (imports and component decorator)
export class TwitterConnectButtonComponent implements OnInit {
  isLoading = false;
  tweetContent: string = ''
  errorMessage: string | null = null;
  oauth_verifier: string = '';
  resource_owner_key: string = '';
  resource_owner_secret: string = '';
  access_token: string = '';
  access_secret: string = '';
  userId: any;

  constructor(
    private twitterService: TwitterService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const oauthVerifier = params['oauth_verifier'];
      if (oauthVerifier) {
        this.oauth_verifier = oauthVerifier;
        // Call the Twitter function when oauth_verifier is available
        this.Twitter();
      }
    });
  }

  connectWithTwitter(): void {
    console.log('click from cmp');
    this.twitterService.TwitterAuthentication().subscribe(
      (response) => {
        console.log('response:', response);
        this.resource_owner_key = response.re_owner_key;
        this.resource_owner_secret = response.re_owner_secret;

        // Save variables in session storage
        sessionStorage.setItem('resource_owner_key', this.resource_owner_key);
        sessionStorage.setItem(
          'resource_owner_secret',
          this.resource_owner_secret
        );

        // Redirect to Twitter for authentication
        const twitterUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=${response.re_owner_key}`;
        window.location.href = twitterUrl;
      },
      (error) => {
        console.log('error:', error);
      }
    );
  }

  Twitter(): void {
    console.log('inside twitter func')
    const resource_owner_key = sessionStorage.getItem('resource_owner_key');
    const resource_owner_secret = sessionStorage.getItem(
      'resource_owner_secret'
    );
    if (this.oauth_verifier && resource_owner_key && resource_owner_secret) {
      console.log('All variables are available, proceed with the next steps');
      // Call your API with the available variables
      this.twitterService
        .getAccess(
          resource_owner_key,
          resource_owner_secret,
          this.oauth_verifier
        )
        .subscribe(
          (response) => {
            console.log('Response from getAccess:', response);
            this.access_token = response.oauth_token;
            this.access_secret = response.oauth_token_secret;
            sessionStorage.setItem('access_token_key', this.access_token);
            sessionStorage.setItem('access_token_secret', this.access_secret);

            // Handle the response as needed
          },
          (error) => {
            console.log('Error from getAccess:', error);
          }
        );
    } else {
      console.log('Some variables are missing, cannot proceed yet');
    }



    this.twitterService.setKeys(resource_owner_key!,resource_owner_secret!,this.access_token,this.access_secret)
  }

  // userInfo() {
  //   const access_token_key = sessionStorage.getItem('access_token_key');
  //   const access_token_secret = sessionStorage.getItem('access_token_secret');

  //   console.log('access_token_key',access_token_key)
  //   console.log('access_token_secret',access_token_secret)

    
  //     this.twitterService.getUserData(access_token_key!, access_token_secret!).subscribe(
  //       (response) => {
  //         console.log('Response from getAccess:', response);
  //         this.userId = response.id_str
  //         console.log('this.userId',this.userId)
  //         sessionStorage.setItem('user_id',  this.userId);
          
          
  //       },
  //       (error) => {
  //         console.log('Error from getAccess:', error);
  //       }
  //     );;
  // }


  // like(){
  //   console.log(this.tweetContent)

  //   const access_token_key = sessionStorage.getItem('access_token_key');
  //   const access_token_secret = sessionStorage.getItem('access_token_secret');
  //   const user_id = sessionStorage.getItem('user_id')
  //   console.log('access_token_key',access_token_key)
  //   console.log('access_token_secret',access_token_secret)  
    
  //   this.twitterService.likeTwitte(access_token_key!,access_token_secret!,this.tweetContent).subscribe(
  //     (response) => {
  //       console.log('Response from getAccess:', response);
  //     },
  //     (error) => {
  //       console.log('Error from getAccess:', error);
  //     }
  //   );;
  // }

  // post(){
  //   this.twitterService.post().subscribe(
  //          (response) => {
  //       console.log('Response from getAccess:', response);
  //     },
  //     (error) => {
  //       console.log('Error from getAccess:', error);
  //     } 
  //   )
  // }


}
