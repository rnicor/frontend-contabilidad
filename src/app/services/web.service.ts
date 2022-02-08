import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(
    private httpClient: HttpClient
    
  ) { }

  get(url: string, options?: HttpHeaders): Observable<any> {
    const headerOptions = options || this.getDefaultFormOptions();
    console.log(headerOptions, options)
    return this.httpClient.get(url, { headers: headerOptions }).pipe(
              map(response => response as any[]),
              catchError(e => throwError(e))
          );
  }

  // getfiles(url: string, options?: HttpHeaders): Observable<any> {
  //   const headerOptions = options || this.getDefaultFormOptions();
  //   return this.httpClient.get(url, {  headers: headerOptions});
  // }

  post(url: string, body: any, options?: HttpHeaders): Observable<any> {
    const headerOptions = options || this.getDefaultFormOptions();
    console.log(headerOptions, body, options)
    return this.httpClient.post(url, body, { headers: headerOptions });
  }
  put(url: string, body: any, options?: HttpHeaders): Observable<any> {
    const headerOptions = options || this.getDefaultFormOptions();
    return this.httpClient.put(url, body, { headers: headerOptions });
  }
  delete(url: string, options?: HttpHeaders): Observable<any> {
    const headerOptions = options || this.getDefaultFormOptions();
    return this.httpClient.delete(url, { headers: headerOptions });
  }
  getDefaultFormOptions(username?: any, password?: any) {
    let httpOptions = new HttpHeaders();
    // httpOptions = httpOptions.append('Content-Type', 'application/x-www-form-urlencoded');
    httpOptions = httpOptions.append('Content-Type', 'application/json');
    httpOptions = httpOptions.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    return httpOptions;
  }
  getAuthHeaders(token?: string) {
    const sessionToken = window.sessionStorage.getItem('currentToken');
    let httpOptions = new HttpHeaders();
    httpOptions = httpOptions.append('Content-Type', 'application/json');
    // httpOptions = httpOptions.append('Authorization', 'Bearer ' + (token ? token : sessionToken));
    httpOptions = httpOptions.append('Authorization', 'Bearer ' + (token ? token : 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWd1bmRvX2FwZWxsaWRvIjoiQ09BUVVJUkEiLCJhcmNoaXZvIjpudWxsLCJ1c2VyX25hbWUiOiJNWUMiLCJwcmltZXJfYXBlbGxpZG8iOiJZQU5BUklDTyIsIm5vbWJyZSI6Ik1JUklBTSIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sInJvbCI6eyJpZCI6MSwic2lnbGEiOiJBRE1JTiIsImRlc2NyaXBjaW9uIjoiQURNSU5JU1RSQURPUiJ9LCJjbGllbnRfaWQiOiJhbmd1bGFyYXBwIiwic3VjdXJzYWwiOnsiaWQiOjQsInRpcG8iOiJDQU0iLCJudW1lcm8iOiIwMCIsIm5vbWJyZSI6IkNBU0EgTUFUUklaIiwiZGlyZWNjaW9uIjoiQXYuIDYgZGUgTWFyem8gTsKwIDU1IFpvbmEgVmlsbGEgQm9saXZhciBcIkFcIiIsInRlbGVmb25vIjoiMjgyMzUzNC0yODI5NTg3IiwiY2VsdWxhciI6bnVsbCwiZmF4IjoiMjgyMjkzNiIsImNpdWRhZCI6IkVsIEFsdG8iLCJkZXBhcnRhbWVudG8iOiJMUFoiLCJwYWlzIjoiQk8ifSwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTY0NDM1NDI1NiwiY2FyZ28iOiJDT05UQURPUkEgR0VORVJBTCIsImp0aSI6IjJhYTFhMWJlLTNjMWEtNDA1Ny1iMWQ1LTk2NzMyNzY3OTRhOCJ9.Zhz4msHm00fCvVPQU2-J4JV4QBhR7jc720po1lFfiRh4pvt6B3ha3T49wZd5rXwK6ffiJKP7A8AHTOR1XWJGGGToM6lYeuIlyDJFnrT4hZ9wOMT0atDNzevsNimojt50OKffdLUHpDgR1yCgNub9ofeHtZyhQEHPlY0C7RYFTRkQKb5O-pc0cof1Y3iOqGIZ6jW4NKZ0TefXvs61SG3zP-Vg9cjftSN8GtgYV5vbto05qauDHLWlTLuQB5kTWkdioPN7cgsHtqrD0meF3pb75G4BAK5F5ECwkp_hgzu_znbilpzX19WIKeOAwFdPSPRaWOaOfnnZToMWr_q3FF-UWA'));
    return httpOptions;
  }

  getAuthHeaders2(token?: string) {
    const sessionToken = window.sessionStorage.getItem('currentToken');
    let httpOptions = new HttpHeaders();
    httpOptions = httpOptions.append('Content-Type', 'multipart/form-data');
    httpOptions = httpOptions.append('Authorization', 'Bearer '+ (token ? token : sessionToken));
    return httpOptions;
  }

  /**
   * Returns form-data like Content-Type Header option.
   */
  getJSONOptions(username?: any, password?: any) {
    let httpOptions = new HttpHeaders();
    // httpOptions = httpOptions.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    httpOptions = httpOptions.append('Content-Type', 'application/json');
    httpOptions = httpOptions.append('Authorization', 'B ' + btoa('angularapp:12345'));
    return httpOptions;
  } 
}
