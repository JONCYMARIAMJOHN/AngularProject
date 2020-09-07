import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  public count = 0;
  public complete = 0;

  private apiCallObsrvSource = new Subject<any>();
  private commonErrorObsrvSource = new Subject<any>();


  public apiCallListener = this.apiCallObsrvSource.asObservable();
  public commonErrorListener = this.commonErrorObsrvSource.asObservable();

  constructor() { }

  isApiCalling(isCalling: boolean) {
    this.apiCallObsrvSource.next(isCalling);
  }

  setCommonError(error: any) {
    this.commonErrorObsrvSource.next(error);
  }
}
