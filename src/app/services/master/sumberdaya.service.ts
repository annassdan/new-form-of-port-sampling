import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Sumberdaya} from "../../models/master/sumberdaya";

@Injectable({
  providedIn: 'root'
})
export class SumberdayaService {

  constructor() { }

  getAll = (): Observable<Sumberdaya[]> => of([
    { uuid: '1', dibuatOleh: '', dibuatPadaTanggal: '', terakhirDiubahOleh: '', terakhirDiubahPadaTanggal: '', namaSumberdaya: 'Pelagis Besar', deskripsiSumberdaya: '' },
    { uuid: '2', dibuatOleh: '', dibuatPadaTanggal: '', terakhirDiubahOleh: '', terakhirDiubahPadaTanggal: '', namaSumberdaya: 'Pelagis Kecil', deskripsiSumberdaya: '' },
    { uuid: '3', dibuatOleh: '', dibuatPadaTanggal: '', terakhirDiubahOleh: '', terakhirDiubahPadaTanggal: '', namaSumberdaya: 'Demersal', 		deskripsiSumberdaya: '' },
    { uuid: '4', dibuatOleh: '', dibuatPadaTanggal: '', terakhirDiubahOleh: '', terakhirDiubahPadaTanggal: '', namaSumberdaya: 'Cucut dan Pari', deskripsiSumberdaya: '' },
    { uuid: '5', dibuatOleh: '', dibuatPadaTanggal: '', terakhirDiubahOleh: '', terakhirDiubahPadaTanggal: '', namaSumberdaya: 'Cumi', 			deskripsiSumberdaya: '' },
    { uuid: '6', dibuatOleh: '', dibuatPadaTanggal: '', terakhirDiubahOleh: '', terakhirDiubahPadaTanggal: '', namaSumberdaya: 'Kekerangan', 	deskripsiSumberdaya: '' },
    { uuid: '7', dibuatOleh: '', dibuatPadaTanggal: '', terakhirDiubahOleh: '', terakhirDiubahPadaTanggal: '', namaSumberdaya: 'Krustase', 		deskripsiSumberdaya: '' },
    { uuid: '8', dibuatOleh: '', dibuatPadaTanggal: '', terakhirDiubahOleh: '', terakhirDiubahPadaTanggal: '', namaSumberdaya: 'Lainnya', 		deskripsiSumberdaya: '' }
  ]);
}
