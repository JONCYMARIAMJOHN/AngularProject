import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  isSave = 0;
  api;

  constructor(private http: HttpClient,
              private router: Router,
              private sharedService: SharedService) {}
  
  // removeRequest(req: HttpRequest<any>) {
  //   const i = this.requests.indexOf(req);
  //   if (i >= 0) {
  //     this.requests.splice(i, 1);
  //   }
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const basicUrl: string = this.generateApiUrl();
    this.api = request.url;
    //debugger;
    const headers1 = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });

    request = request.clone({
      url: basicUrl + request.url,
      headers: headers1
    });

    // this.sharedService.count++;
    // this.sharedService.isApiCalling(true);
    // return next.handle(request).pipe(tap(
    //         (event: HttpEvent<any>) => {
    //             if (event instanceof HttpResponse) {
    //                 this.sharedService.complete++;
    //                 if (this.sharedService.count === this.sharedService.complete) {
    //                     this.sharedService.isApiCalling(false);
    //                 } else {
    //                     this.sharedService.isApiCalling(true);
    //                 }

    //             }
    //         },
    //         (err: HttpErrorResponse) => {
    //             this.sharedService.complete++;
    //             if (this.sharedService.count === this.sharedService.complete) {
    //                 this.sharedService.isApiCalling(false);
    //             } else {
    //                 this.sharedService.isApiCalling(true);
    //             }
    //             this.sharedService.isApiCalling(false);
    //             if (err.status === 404) {
    //                 this.sharedService.setCommonError({
    //                     type: 'error',
    //                     message: 'Server Error'
    //                 });
    //             }
    //             if (err instanceof HttpErrorResponse) {
    //                 const {error} = err;
    //                 if (error && error.message) {
    //                     this.sharedService.setCommonError({
    //                         type: 'error',
    //                         message: error.message,
    //                         isHTML: true
    //                     });
    //                 } else {
    //                     this.sharedService.setCommonError({
    //                         type: 'error',
    //                         message: 'Something went wrong',
    //                         isHTML: true
    //                     });
    //                 }

    //             }

    //             // return of(err);
    //         }
    //     ));

    return next.handle(request).pipe(tap(() => {
     },
    (err: any) => {
      console.log(err);
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {

          return;
        }
      }

    }));
  }

  generateApiUrl() {
    let url = '';
    url = 'https://' + environment.apiUrl;
    if (environment.port) {
      url = url + ':' + environment.port;
    }
    // url = url + '/api/';
    if (environment.isSecure) {
      url = url.replace('http://', 'https://');
    }
    return url;
  }
}
