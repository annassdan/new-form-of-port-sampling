import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Organisasi} from "../../models/master/organisasi";

@Injectable({
  providedIn: 'root'
})
export class OrganisasiService {

  constructor(http: HttpClient) { }

  getAll = (): Observable<Organisasi[]> => of([
    { uuid: '1', dibuatOleh: '', dibuatPadaTanggal: '', terakhirDiubahOleh: '', terakhirDiubahPadaTanggal: '', namaOrganisasi: 'BRPL', deskripsiOrganisasi: 'Balai Riset Perikanan Laut' },
    { uuid: '2', dibuatOleh: '', dibuatPadaTanggal: '', terakhirDiubahOleh: '', terakhirDiubahPadaTanggal: '', namaOrganisasi: 'WWF Indonesia', deskripsiOrganisasi: '' },
    { uuid: '3', dibuatOleh: '', dibuatPadaTanggal: '', terakhirDiubahOleh: '', terakhirDiubahPadaTanggal: '', namaOrganisasi: 'WCS Indonesia', deskripsiOrganisasi: '' },
    { uuid: '4', dibuatOleh: '', dibuatPadaTanggal: '', terakhirDiubahOleh: '', terakhirDiubahPadaTanggal: '', namaOrganisasi: 'UNHAS', deskripsiOrganisasi: '' },
    { uuid: '5', dibuatOleh: '', dibuatPadaTanggal: '', terakhirDiubahOleh: '', terakhirDiubahPadaTanggal: '', namaOrganisasi: 'UKIP', deskripsiOrganisasi: '' },
    { uuid: '6', dibuatOleh: '', dibuatPadaTanggal: '', terakhirDiubahOleh: '', terakhirDiubahPadaTanggal: '', namaOrganisasi: 'UNIPA', deskripsiOrganisasi: '' },
    { uuid: '7', dibuatOleh: '', dibuatPadaTanggal: '', terakhirDiubahOleh: '', terakhirDiubahPadaTanggal: '', namaOrganisasi: 'AP2HI', deskripsiOrganisasi: '' },
    { uuid: '8', dibuatOleh: '', dibuatPadaTanggal: '', terakhirDiubahOleh: '', terakhirDiubahPadaTanggal: '', namaOrganisasi: 'EDF Indonesia', deskripsiOrganisasi: '' },
    { uuid: '9', dibuatOleh: '', dibuatPadaTanggal: '', terakhirDiubahOleh: '', terakhirDiubahPadaTanggal: '', namaOrganisasi: 'Loka Bali', deskripsiOrganisasi: '' }
  ]);

}
