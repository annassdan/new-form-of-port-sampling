import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {FADE_TIME} from "../../../../shared/constants";
import {Utilities} from "../../../../shared/utilities";
import {MainStateService} from "../../../../shared/services/main-state.service";
import {MatDialogRef} from "@angular/material/dialog";
import {PendaratanBrigeService} from "../pendaratan-brige.service";
import {OrganisasiService} from "../../../../services/master/organisasi.service";
import {SumberdayaService} from "../../../../services/master/sumberdaya.service";
import {generateUUID, unsubscribes} from "../../../../shared/utils";
import {FormGroup} from "@angular/forms";
import {Observable, of, Subscription} from "rxjs";
import {
  addFormArrayMember,
  createFormGroup,
  createFormGroupContent,
  extractAllMemberOfFormArray,
  removeFormArrayMember
} from "../../../../shared/reactive-form-modeling";
import {rincianBiologiUkuran, sampelBiologiUkuran} from "../../../../models/ukuran/ukuran";

@Component({
  selector: 'app-ukuran',
  templateUrl: './ukuran.component.html',
  styleUrls: ['./ukuran.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(FADE_TIME, style({opacity: 1}))
      ])
    ])
  ]
})
export class UkuranComponent extends Utilities implements OnInit, OnDestroy, AfterViewInit {

  formUkuran: FormGroup;
  subs: Subscription[] = [];

  constructor(public rootState: MainStateService,
              public changeDetector: ChangeDetectorRef,
              public dialogRef: MatDialogRef<UkuranComponent>,
              public currentPendaratanState: PendaratanBrigeService,
              public organisasiService: OrganisasiService,
              public sumberdayaService: SumberdayaService) { super(changeDetector); }

  ngOnInit() {
    this.subs.push(this.currentPendaratanState.formUkuran$.subscribe(async value => {
      if (value === undefined) {
        await this.changeDetector.detectChanges();
        this.dialogRef.close();
      } else {
        /* init form ukuran */
        this.formUkuran = value;
      }

      unsubscribes(this.subs);
    }));
  }


  ngOnDestroy(): void {
    this.subs = unsubscribes(this.subs);
  }

  listOfJenisSampel(formArrayControlName: string) {
    return extractAllMemberOfFormArray(this.formUkuran, formArrayControlName);
  }

  addJenisSampel(formArrayControlName: string) {
    const id = generateUUID();
    addFormArrayMember(this.formUkuran, formArrayControlName, createFormGroup(createFormGroupContent({...sampelBiologiUkuran, uuid: id})))
      .then(r => {
        console.log(this.formUkuran.value)
      }).catch();
  }

  removeJenisSampel(formArrayControlName: string, index: number) {
    removeFormArrayMember(this.formUkuran, formArrayControlName, index);
  }


  listOfRincianKomposisiUkuran(formArrayControlName: string) {
    return extractAllMemberOfFormArray(this.formUkuran, formArrayControlName);
  }

  addRincianKomposisiUkuran(formArrayControlName: string) {
    const id = generateUUID();
    addFormArrayMember(this.formUkuran, formArrayControlName, createFormGroup(createFormGroupContent({...rincianBiologiUkuran, uuid: id})))
      .then(r => {
        console.log(this.formUkuran.value)
      }).catch();
  }

  removeRincianKomposisiUkuran(formArrayControlName: string, index: number) {
    removeFormArrayMember(this.formUkuran, formArrayControlName, index);
  }


  pencatatSource = (): Observable<any[]> => {
    return of([
      { uuid: '1', nama: 'Muhammad Nur Annas', posisi: '' },
      { uuid: '2', nama: 'I Komang Suryana', posisi: '' },
      { uuid: '3', nama: 'Syaifullah', posisi: '' },
      { uuid: '4', nama: 'Arfan', posisi: '' }
    ]);
  };


}
