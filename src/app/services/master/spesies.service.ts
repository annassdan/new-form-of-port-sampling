import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SpesiesService {

  constructor(public http: HttpClient) { }

  getSpesies = (wpp?: string) => {
    return this.http.get(`/assets/ikan/571.json`);
  }

}
