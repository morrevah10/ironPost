import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  readonly APIurl = 'https://your-api-url/';

  constructor(private http: HttpClient) {}

  // Function to initiate Twitter authentication
  initiateTwitterAuthentication(): Observable<any> {
    const url = this.APIurl + 'twitter/auth'; // Replace with your backend endpoint for initiating Twitter authentication
    return this.http.get<any>(url);
  }

  // Function to complete Twitter authentication with provided OAuth tokens
  completeTwitterAuthentication(oauthToken: string, oauthVerifier: string): Observable<any> {
    const url = this.APIurl + 'twitter/callback'; // Replace with your backend endpoint for handling Twitter callback
    const params = { oauthToken, oauthVerifier };
    return this.http.get<any>(url, { params });
  }
}
