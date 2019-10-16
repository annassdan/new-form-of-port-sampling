import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {rincianPendaratan} from '../../../models/pendaratan/pendaratan';


@Injectable({
  providedIn: 'root'
})
export class PendaratanBrigeService {

  private _formRincianPendaratan: Subject<any> = new BehaviorSubject<any>(undefined);

  constructor() { }


  get formRincianPendaratan$(): Observable<any> {
    return this._formRincianPendaratan.asObservable();
  }

  setCurrentFormRincianPendaratan(value = rincianPendaratan) {
    this._formRincianPendaratan.next(value);
  }
}
