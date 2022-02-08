import { Injectable } from '@angular/core';
import { SERVER } from '../config/server.config';
import { WebService } from './web.service';
// import * as jwt_decode from 'jwt-decode';
import jwt_decode from "jwt-decode";
// import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(
    private webService: WebService,
    private router: Router
  ) { }
  login(user ?: any) {
    // return this.webService.post(SERVER.LOGIN, user, this.webService.getJSONOptions());
    return this.webService.post(`${SERVER.LOGIN}?grant_type=${user.grant_type}&username=${user.username}&password=${user.password}`, null, this.webService.getDefaultFormOptions('angularapp','12345'));
  }
  getToken() {
    // return sessionStorage.getItem('mfx-token') ? sessionStorage.getItem('mfx-token') : (localStorage.getItem('mfx-token') ? localStorage.getItem('mfx-token') : ''); 
    return 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWd1bmRvX2FwZWxsaWRvIjoiQ09BUVVJUkEiLCJhcmNoaXZvIjpudWxsLCJ1c2VyX25hbWUiOiJNWUMiLCJwcmltZXJfYXBlbGxpZG8iOiJZQU5BUklDTyIsIm5vbWJyZSI6Ik1JUklBTSIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sInJvbCI6eyJpZCI6MSwic2lnbGEiOiJBRE1JTiIsImRlc2NyaXBjaW9uIjoiQURNSU5JU1RSQURPUiJ9LCJjbGllbnRfaWQiOiJhbmd1bGFyYXBwIiwic3VjdXJzYWwiOnsiaWQiOjQsInRpcG8iOiJDQU0iLCJudW1lcm8iOiIwMCIsIm5vbWJyZSI6IkNBU0EgTUFUUklaIiwiZGlyZWNjaW9uIjoiQXYuIDYgZGUgTWFyem8gTsKwIDU1IFpvbmEgVmlsbGEgQm9saXZhciBcIkFcIiIsInRlbGVmb25vIjoiMjgyMzUzNC0yODI5NTg3IiwiY2VsdWxhciI6bnVsbCwiZmF4IjoiMjgyMjkzNiIsImNpdWRhZCI6IkVsIEFsdG8iLCJkZXBhcnRhbWVudG8iOiJMUFoiLCJwYWlzIjoiQk8ifSwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTY0NDM1NDI1NiwiY2FyZ28iOiJDT05UQURPUkEgR0VORVJBTCIsImp0aSI6IjJhYTFhMWJlLTNjMWEtNDA1Ny1iMWQ1LTk2NzMyNzY3OTRhOCJ9.Zhz4msHm00fCvVPQU2-J4JV4QBhR7jc720po1lFfiRh4pvt6B3ha3T49wZd5rXwK6ffiJKP7A8AHTOR1XWJGGGToM6lYeuIlyDJFnrT4hZ9wOMT0atDNzevsNimojt50OKffdLUHpDgR1yCgNub9ofeHtZyhQEHPlY0C7RYFTRkQKb5O-pc0cof1Y3iOqGIZ6jW4NKZ0TefXvs61SG3zP-Vg9cjftSN8GtgYV5vbto05qauDHLWlTLuQB5kTWkdioPN7cgsHtqrD0meF3pb75G4BAK5F5ECwkp_hgzu_znbilpzX19WIKeOAwFdPSPRaWOaOfnnZToMWr_q3FF-UWA'
  }
}
