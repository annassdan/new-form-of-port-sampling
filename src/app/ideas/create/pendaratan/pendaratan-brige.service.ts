import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {pendaratan, rincianPendaratan} from '../../../models/pendaratan/pendaratan';
import {operasional} from "../../../models/operasional/operasional";
import {biologiUkuran} from "../../../models/ukuran/ukuran";
import {biologiReproduksi} from "../../../models/reproduksi/reproduksi";


@Injectable({ providedIn: 'root' })
export class PendaratanBrigeService {

  private _formPendaratan: Subject<any> = new BehaviorSubject<any>(undefined);

  private _formRincianPendaratan: Subject<any> = new BehaviorSubject<any>(undefined);

  private _formOperasional: Subject<any> = new BehaviorSubject<any>(undefined);

  private _formUkuran: Subject<any> = new BehaviorSubject<any>(undefined);

  private _formReproduksi: Subject<any> = new BehaviorSubject<any>(undefined);

  constructor() { }


  get formPendaratan$(): Observable<any> {
    return this._formPendaratan.asObservable();
  }

  setFormPendaratan(value = pendaratan) {
    this._formPendaratan.next(value);
  }

  get formOperasional$(): Observable<any> {
    return this._formOperasional.asObservable();
  }

  setCurrentFormOperasional(value = operasional) {
    this._formOperasional.next(value);
  }

  get formUkuran$(): Observable<any> {
    return this._formUkuran.asObservable();
  }

  setCurrentFormUkuran(value = biologiUkuran) {
    this._formUkuran.next(value);
  }

  get formReproduksi$(): Observable<any> {
    return this._formReproduksi.asObservable();
  }

  setCurrentFormReproduksi(value = biologiReproduksi) {
    this._formReproduksi.next(value);
  }

  get formRincianPendaratan$(): Observable<any> {
    return this._formRincianPendaratan.asObservable();
  }

  setCurrentFormRincianPendaratan(value = rincianPendaratan) {
    this._formRincianPendaratan.next(value);
  }


}
