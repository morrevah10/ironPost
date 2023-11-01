import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TwitterService {
  readonly APIurl = 'https://ironpost-production.up.railway.app/';

  constructor(private http: HttpClient) {}

  // // Function to initiate Twitter authentication
  // initiateTwitterAuthentication(): Observable<any> {
  //   const url = this.APIurl + 'twitter/auth'; // Replace with your backend endpoint for initiating Twitter authentication
  //   return this.http.get<any>(url);
  // }

  // // Function to complete Twitter authentication with provided OAuth tokens
  // completeTwitterAuthentication(oauthToken: string, oauthVerifier: string): Observable<any> {
  //   const url = this.APIurl + 'twitter/callback'; // Replace with your backend endpoint for handling Twitter callback
  //   const params = { oauthToken, oauthVerifier };
  //   return this.http.get<any>(url, { params });
  // }

  TwitterAuthentication(): Observable<any> {
    console.log('click from service');

    const url = this.APIurl + 'get_resource_token/';
    return this.http.get<any>(url);
  }

  getAccess(
    resource_owner_key: string,
    resource_owner_secret: string,
    oauth_verifier: string
  ) {
    console.log('resource_owner_key', resource_owner_key);
    console.log('resource_owner_secret', resource_owner_secret);
    console.log('oauth_verifier', oauth_verifier);
    let queryParams = {
      resource_owner_key: resource_owner_key,
      resource_owner_secret: resource_owner_secret,
      oauth_verifier: oauth_verifier,
    };

    const url = this.APIurl + 'get_access_token/';
    return this.http.get<any>(url, { params: queryParams });
  }

  getUserData(access_token_key:string,access_token_secret:string){
    console.log('inside user data')
    let queryParams = {
      access_token_key: access_token_key,
      access_token_secret: access_token_secret,
    };
    console.log('queryParams',queryParams)

    const url = this.APIurl + 'twitter_get_user_data/';
    return this.http.get<any>(url, { params: queryParams });
  }

  // likeTwitte(access_token_key:string,access_token_secret:string,text:string){
  //   console.log('inside user data')
  //   let queryParams = {
  //     access_token_key: access_token_key,
  //     access_token_secret: access_token_secret,
  //     text:text
  //   };
  //   console.log('queryParams',queryParams)

  //   const url = this.APIurl + 'like_tweet/';
  //   return this.http.get<any>(url, { params: queryParams });
  // }


  // post(){
  //   console.log('inside')
  //   const url = this.APIurl + 'like_tweet/';
  //     return this.http.get<any>(url);
  // }

  setKeys(resource_owner_key:string,resource_owner_secret:string,access_token:string,access_secret:string){

    console.log('inside setKeys')
  }
}
