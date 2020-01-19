import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {
  addFormArrayMember,
  createFormGroup,
  createFormGroupContent,
  extractAllMemberOfFormArray,
  removeFormArrayMember
} from '../../../shared/reactive-form-modeling';
import {pendaratan, rincianPendaratan} from '../../../models/pendaratan/pendaratan';
import {MatButton, MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {fromMaterialExportAsNative} from '../../../shared/material-util';
import {PendaratanBrigeService} from './pendaratan-brige.service';
import {Utilities} from "../../../shared/utilities";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-pendaratan',
  templateUrl: './pendaratan.component.html',
  styleUrls: ['./pendaratan.component.scss'],
})
export class PendaratanComponent extends Utilities implements OnInit, AfterViewInit {

  formPendaratan: FormGroup;

  constructor(public currentPendaratanState: PendaratanBrigeService,
              public router: Router,
              public dialog: MatDialog) {
    super();
    this.formPendaratanInializing();
  }


  ngOnInit() {
  }

  /**
   * agar lebih aman untuk menempatkan initalizing yang datanya berhubungan dengn ui interface
   * maka baiknya ditempatkan pada lifecyle afterViewInit
   */
  ngAfterViewInit(): void {

  }

  formPendaratanInializing() {
    this.formPendaratan = createFormGroup(createFormGroupContent(pendaratan));
  }


  /**
   * Control form array name untuk rincian pendaratan
   * @param formArrayControlName
   */
  addRincianPendaratan(formArrayControlName: string) {
    addFormArrayMember(this.formPendaratan, formArrayControlName, createFormGroup(createFormGroupContent(rincianPendaratan)))
      .then(r => {
        console.log(this.formPendaratan.value)
      }).catch();
  }

  removeRincianPendaratan(formArrayControlName: string, index: number) {
    removeFormArrayMember(this.formPendaratan, formArrayControlName, index);
  }


  listOfRincianPendaratan(formArrayControlName: string) {
    return extractAllMemberOfFormArray(this.formPendaratan, formArrayControlName);
  }


  async openRincianPendaratan(formRincianPendaratan: FormGroup | any, button: MatButton) {
    /* Blur button tambah rincian pendaratan */
    await fromMaterialExportAsNative(button).blur();

    await this.currentPendaratanState.setCurrentFormRincianPendaratan(formRincianPendaratan);
    this.router.navigate(['rincian-pendaratan']).then(r => {}).catch();
  }


  selected($event: MatAutocompleteSelectedEvent) {
    // console.log($event);
    // console.log(this.formPendaratan);
  }


  sumberDayaSource = (): Observable<any[]> => {
    return of([
      { uuid: '1', namaSumberdaya: 'Satu' },
      { uuid: '2', namaSumberdaya: 'Dua' },
      { uuid: '3', namaSumberdaya: 'Tiga' },
      { uuid: '4', namaSumberdaya: 'Empat' }
    ]);
  };

  pencatatSource = (): Observable<any[]> => {
    return of([
      { uuid: '1', nama: 'Muhammad Nur Annas', posisi: '' },
      { uuid: '2', nama: 'I Komang Suryana', posisi: '' },
      { uuid: '3', nama: 'Syaifullah', posisi: '' },
      { uuid: '4', nama: 'Arfan', posisi: '' }
    ]);
  };

}
