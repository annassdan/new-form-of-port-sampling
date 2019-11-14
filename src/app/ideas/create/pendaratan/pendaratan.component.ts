import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {
  addFormArrayMember,
  createFormGroup,
  createFormGroupContent,
  extractAllMemberOfFormArray, extractFormControlValue,
  removeFormArrayMember
} from '../../../shared/reactive-form-modeling';
import {pendaratan, rincianPendaratan} from '../../../models/pendaratan/pendaratan';
import {DomSanitizer} from '@angular/platform-browser';
import {MatButton, MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {fromMaterialExportAsNative} from '../../../shared/material-util';
import {PendaratanBrigeService} from './pendaratan-brige.service';

@Component({
  selector: 'app-pendaratan',
  templateUrl: './pendaratan.component.html',
  styleUrls: ['./pendaratan.component.scss'],
})
export class PendaratanComponent implements OnInit, AfterViewInit {

  formPendaratan: FormGroup;
  extractFormControlValue = extractFormControlValue;

  constructor(public sanitizer: DomSanitizer,
              public currentPendaratanState: PendaratanBrigeService,
              public router: Router,
              public dialog: MatDialog) {
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

}
