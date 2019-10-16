import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {
  addFormArrayMember,
  createFormGroup,
  createFormGroupContent,
  extractAllMemberOfFormArray, removeFormArrayMember
} from '../../../shared/reactive-form-modeling';
import {pendaratan, rincianPendaratan} from '../../../models/pendaratan/pendaratan';
import {DomSanitizer} from '@angular/platform-browser';
import {MatButton, MatDialog} from '@angular/material';
import {RincianPendaratanComponent} from './rincian-pendaratan/rincian-pendaratan.component';
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
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  @ViewChild('frameChart', {static: false, read: ElementRef}) frameChart;


  src = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTPCc8bDHq3kuk-DjvJJmS5Bngu8rG-sd0lCepDEYWblnDr39hz8zABks1doH1_VBCMdfol96HrVoU3/pubchart?oid=1152452416&amp;format=interactive';

  constructor(public sanitizer: DomSanitizer,
              public currentPendaratanState: PendaratanBrigeService,
              public router: Router,
              public dialog: MatDialog) {
    this.formPendaratanInializing();
  }


  getUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
  }

  ngOnInit() {
  }

  /**
   * agar lebih aman untuk menempatkan initalizing yang datanya berhubungan dengn ui interface
   * maka baiknya ditempatkan pada lifecyle afterViewInit
   */
  ngAfterViewInit(): void {

    // const x = document.getElementById('frameChartx');
    // console.log(x);
    // x[0].src = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTPCc8bDHq3kuk-DjvJJmS5Bngu8rG-sd0lCepDEYWblnDr39hz8zABks1doH1_VBCMdfol96HrVoU3/pubchart?oid=1152452416&amp;format=interactive';
    // x.contentWindow.location.reload();

    // setInterval(() => {
    //   // this.src = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTPCc8bDHq3kuk-DjvJJmS5Bngu8rG-sd0lCepDEYWblnDr39hz8zABks1doH1_VBCMdfol96HrVoU3/pubchart?oid=1152452416&amp;format=interactive';
    // }, 10000);

    // console.log(this.frameChart.nativeElement.contentWindow);


    // window.addEventListener('message', event => {
    //   console.log(event)
    // // IMPORTANT: check the origin of the data!
    // if (event.origin.startsWith('https://docs.google.com/')) {
    //   // The data was sent from your site.
    //   // Data sent with postMessage is stored in event.data:
    //   console.log(event.data);
    // } else {
    //   // The data was NOT sent from your site!
    //   // Be careful! Do not use it. This else branch is
    //   // here just for clarity, you usually shouldn't needed.
    //   return;
    // }
    // });


    // this.frameChart.nativeElement.contentWindow.postMessage( { d: 'sdsdsd'}, 'http://localhost:4200');
    // setInterval(() => {
    // console.log('#reload');
    // this.frameChart.nativeElement.contentWindow.location.reload();
    // }, 9000);
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
      }).catch();
  }

  removeRincianPendaratan(formArrayControlName: string, index: number) {
    removeFormArrayMember(this.formPendaratan, formArrayControlName, index)
      .then(r => {
      }).catch();
  }


  listOfRincianPendaratan(formArrayControlName: string) {
    return extractAllMemberOfFormArray(this.formPendaratan, formArrayControlName);
  }


  async openRincianPendaratan(formRincianPendaratan: FormGroup | any, button: MatButton) {
    await this.currentPendaratanState.setCurrentFormRincianPendaratan(formRincianPendaratan);
    fromMaterialExportAsNative(button).blur();
    this.router.navigate(['rincian-pendaratan']).then(r => {}).catch();
  }

}
