import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
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
import {Observable, of, Subscription} from "rxjs";
import {OrganisasiService} from "../../../services/master/organisasi.service";
import {SumberdayaService} from "../../../services/master/sumberdaya.service";
import {Operasional, operasional} from "../../../models/operasional/operasional";
import {extractingValue, generateUUID} from "../../../shared/utils";
import {
  CONTROL_DATA_OPERASIONAL,
  CONTROL_DATA_REPRODUKSI,
  CONTROL_DATA_UKURAN,
  PK_COLUMN,
  REF_TO_RINCIAN_PENDARATAN
} from "../../../shared/constants";
import {biologiUkuran, BiologiUkuran} from "../../../models/ukuran/ukuran";
import {biologiReproduksi, BiologiReproduksi} from "../../../models/reproduksi/reproduksi";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {
  PENDARATAN_X_OPERASIONAL, PENDARATAN_X_REPRODUKSI, PENDARATAN_X_UKURAN,
  RINCIAN_PENDARATAN_X_OPERASIONAL, RINCIAN_PENDARATAN_X_REPRODUKSI, RINCIAN_PENDARATAN_X_UKURAN,
  TransformModel,
  TransformType
} from "../../../models/feat";

@Component({
  selector: 'app-pendaratan',
  templateUrl: './pendaratan.component.html',
  styleUrls: ['./pendaratan.component.scss'],
})
export class PendaratanComponent extends Utilities implements OnInit, AfterViewInit {

  subs: Subscription[] = [];

  formPendaratan: FormGroup;
  clickOnRincianPendaratanMenu = false;

  creatingOperasional = false;
  operasionalCreated = false;

  creatingUkuran = false;
  ukuranCreated = false;

  creatingReproduksi = false;
  reproduksiCreated = false;

  @ViewChild('targetOrganisasi', { static: false }) targetOrganisasi;
  @ViewChild('menu', { static: false }) menu: MatMenu;

  menuTrigger: MatMenuTrigger;

  constructor(public currentPendaratanState: PendaratanBrigeService,
              public cd: ChangeDetectorRef,
              public router: Router,
              public organisasiService: OrganisasiService,
              public sumberdayaService: SumberdayaService,
              public dialog: MatDialog) {
    super();
    this.formPendaratanInializing();
  }


  ngOnInit() {
  }


  hasLinkedFormTo(which: 'dataOperasional' | 'dataUkuran' | 'dataReproduksi', refId: String) {
    if (this.formPendaratan) {
      const fArrays = this.extractFormArray(this.formPendaratan, which);
      return fArrays.controls.filter(f => extractingValue(f.value, REF_TO_RINCIAN_PENDARATAN) === refId).length > 0;
    }

    return false;
  }


  /**
   * Mengidentifikasi spesifik form group yang reference ke spesifik rincian pendaratan
   * @param control 'controlNameGroupArray' dari Operasional/Ukuran/Reproduksi
   * @param refId id dari rincian pendaratan yang mana
   */
  specifyLinkedWithRincianPendaratan(control: string, refId: string): FormGroup {
    if (this.formPendaratan) {
      const fArrays = this.extractFormArray(this.formPendaratan, control);
      if (fArrays && fArrays.length > 0) {
        for (const formGroup of fArrays.controls) {
          if (this.extractingValue(formGroup.value, REF_TO_RINCIAN_PENDARATAN) === refId) {
            return <FormGroup> formGroup;
          }
        }
      }
    }

    return undefined;
  }


  /**
   * agar lebih aman untuk menempatkan initalizing yang datanya berhubungan dengn ui interface
   * maka baiknya ditempatkan pada lifecyle afterViewInit
   */
  ngAfterViewInit(): void {
  }

  formPendaratanInializing() {
    /* listen to new initializing form pendaratan */
    // this.subs.push(this.currentPendaratanState.formPendaratan$.subscribe(form => {
    //
    //   if (form) {
    //     console.log(form)
    //     this.formPendaratan = form;
    //     this.cd.detectChanges();
    //   } else {
    //     console.log('!form')
    //   }
    // }));


    this.formPendaratan = createFormGroup(createFormGroupContent({...pendaratan, uuid: generateUUID()}));
    this.currentPendaratanState.setFormPendaratan(this.formPendaratan);
  }





  /**
   * Control form array name untuk rincian pendaratan
   * @param formArrayControlName
   */
  addRincianPendaratan(formArrayControlName: string) {
    // if (!this.formPendaratan.valid) {
      // this.formPendaratan.markAllAsTouched();
    // }

    const id = generateUUID();
    console.log(id);
    addFormArrayMember(this.formPendaratan, formArrayControlName, createFormGroup(createFormGroupContent({...rincianPendaratan, uuid: id})))
      .then(r => {
        console.log(this.formPendaratan.value)
      }).catch();
  }


  async addOperasional(refRincianPendaratan: FormGroup | any) {

    console.log(refRincianPendaratan.value);

    if (this.hasLinkedFormTo("dataOperasional", extractingValue(refRincianPendaratan.value, PK_COLUMN))) {
      console.log('Sudah punya data operasional');
      return;
    }

    // if (!this.formPendaratan.valid) {
    //   this.formPendaratan.markAllAsTouched();
    // }

    /* mengambil ref id dari rincian pendaratan */
    const refId = extractingValue(refRincianPendaratan.value, PK_COLUMN);
    console.log(refId)
    const objectInit: Operasional = {...operasional, uuid: generateUUID(), rincian_pendaratan: refId };

    await addFormArrayMember(this.formPendaratan, CONTROL_DATA_OPERASIONAL, createFormGroup(createFormGroupContent(objectInit)))
      .then(r => {
        console.log(this.formPendaratan.value)
      }).catch();
  }


  async addUkuran(refRincianPendaratan: FormGroup | any) {
    if (this.hasLinkedFormTo("dataUkuran", extractingValue(refRincianPendaratan.value, PK_COLUMN))) {
      console.log('Sudah punya data ukuran');
      return;
    }

    // if (!this.formPendaratan.valid) {
    //   this.formPendaratan.markAllAsTouched();
    // }

    /* mengambil ref id dari rincian pendaratan */
    const refId = extractingValue(refRincianPendaratan.value, PK_COLUMN);
    const objectInit: BiologiUkuran = {...biologiUkuran, uuid: generateUUID(), rincian_pendaratan: refId };

    await addFormArrayMember(this.formPendaratan, CONTROL_DATA_UKURAN, createFormGroup(createFormGroupContent(objectInit)))
      .then(r => {
        console.log(this.formPendaratan.value)
      }).catch();
  }


  async addReproduksi(refRincianPendaratan: FormGroup | any) {
    if (this.hasLinkedFormTo("dataReproduksi", extractingValue(refRincianPendaratan.value, PK_COLUMN))) {
      console.log('Sudah punya data reproduksi');
      return;
    }

    // if (!this.formPendaratan.valid) {
    //   this.formPendaratan.markAllAsTouched();
    // }

    /* mengambil ref id dari rincian pendaratan */
    const refId = extractingValue(refRincianPendaratan.value, PK_COLUMN);
    const objectInit: BiologiReproduksi = {...biologiReproduksi, uuid: generateUUID(), rincian_pendaratan: refId };

    await addFormArrayMember(this.formPendaratan, CONTROL_DATA_REPRODUKSI, createFormGroup(createFormGroupContent(objectInit)))
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


  async openRincianPendaratan(formRincianPendaratan: FormGroup | any, button?: MatButton) {
    /* Blur button tambah rincian pendaratan */
    // await fromMaterialExportAsNative(button).blur();

    await this.currentPendaratanState.setCurrentFormRincianPendaratan(formRincianPendaratan);
    this.router.navigate(['rincian-pendaratan', extractingValue(formRincianPendaratan.value, PK_COLUMN)]).then(r => {}).catch();
  }

  async openOperasional(formRincianPendaratan: FormGroup | any, button?: MatButton) {
    this.addOperasional(formRincianPendaratan).then(async value => {
      // await fromMaterialExportAsNative(button).blur();
      const formOperasional = this.specifyLinkedWithRincianPendaratan(CONTROL_DATA_OPERASIONAL, extractingValue(formRincianPendaratan.value, PK_COLUMN));

      if (formOperasional) {
        this.alsoAffectedToOperasional(formRincianPendaratan);

        /* dipakai untuk beberapa kebutuhan */
        await this.currentPendaratanState.setCurrentFormRincianPendaratan(formRincianPendaratan);


        await this.currentPendaratanState.setCurrentFormOperasional(formOperasional);
        this.router.navigate(['operasional', extractingValue(formOperasional.value, PK_COLUMN)], ).then(r => {}).catch();
      }
    });
  }

  async openUkuran(formRincianPendaratan: FormGroup | any, button?: MatButton) {
    this.addUkuran(formRincianPendaratan).then(async value => {
      // await fromMaterialExportAsNative(button).blur();
      const formUkuran = this.specifyLinkedWithRincianPendaratan(CONTROL_DATA_UKURAN, extractingValue(formRincianPendaratan.value, PK_COLUMN));

      if (formUkuran) {
        this.alsoAffectedToUkuran(formRincianPendaratan);

        /* dipakai untuk beberapa kebutuhan */
        await this.currentPendaratanState.setCurrentFormRincianPendaratan(formRincianPendaratan);

        await this.currentPendaratanState.setCurrentFormUkuran(formUkuran);
        this.router.navigate(['ukuran', extractingValue(formUkuran.value, PK_COLUMN)]).then(r => {}).catch();
      }
    });
  }

  async openReproduksi(formRincianPendaratan: FormGroup | any, button?: MatButton) {
    this.addReproduksi(formRincianPendaratan).then(async value => {
      // await fromMaterialExportAsNative(button).blur();
      const formReproduksi = this.specifyLinkedWithRincianPendaratan(CONTROL_DATA_REPRODUKSI, extractingValue(formRincianPendaratan.value, PK_COLUMN));

      if (formReproduksi) {
        this.alsoAffectedToReproduksi(formRincianPendaratan);

        /* dipakai untuk beberapa kebutuhan */
        await this.currentPendaratanState.setCurrentFormRincianPendaratan(formRincianPendaratan);

        await this.currentPendaratanState.setCurrentFormReproduksi(formReproduksi);
        this.router.navigate(['reproduksi', extractingValue(formReproduksi.value, PK_COLUMN)]).then(r => {}).catch();
      }
    });
  }


  patchAffected(from: FormGroup, fromControl: string, to: FormGroup, toControl: string, type: TransformType) {
    if (type === "FormGroup") {
      const fTo = this.extractFormGroup(to, toControl);
      // console.log(fTo)
      const fromValue = this.extractFormGroup(from, fromControl).value;
      console.log(fromValue)
      this.patchFormGroup(fTo, fromValue);
    } else if (type === "FormControl") {
      const v = this.extractFormControl(from, fromControl).value;
      this.extractFormControl(to, toControl).patchValue(v);
    }
  }



  async alsoAffectedToOperasional(formRincianPendaratan: FormGroup, reverse = false) {
    if (reverse) {

    } else {
      if (this.hasLinkedFormTo(CONTROL_DATA_OPERASIONAL, extractingValue(formRincianPendaratan.value, PK_COLUMN))) {
        const form = this.specifyLinkedWithRincianPendaratan(CONTROL_DATA_OPERASIONAL, extractingValue(formRincianPendaratan.value, PK_COLUMN));
        RINCIAN_PENDARATAN_X_OPERASIONAL.forEach(c => this.patchAffected(formRincianPendaratan, c.from, form, c.to, c.type));
        PENDARATAN_X_OPERASIONAL.forEach(c => this.patchAffected(this.formPendaratan, c.from, form, c.to, c.type));
      }
    }
  }

  async alsoAffectedToUkuran(formRincianPendaratan: FormGroup, reverse = false) {
    if (reverse) {

    } else {
      if (this.hasLinkedFormTo(CONTROL_DATA_UKURAN, extractingValue(formRincianPendaratan.value, PK_COLUMN))) {
        const form = this.specifyLinkedWithRincianPendaratan(CONTROL_DATA_UKURAN, extractingValue(formRincianPendaratan.value, PK_COLUMN));
        RINCIAN_PENDARATAN_X_UKURAN.forEach(c => this.patchAffected(formRincianPendaratan, c.from, form, c.to, c.type));
        PENDARATAN_X_UKURAN.forEach(c => this.patchAffected(this.formPendaratan, c.from, form, c.to, c.type));
      }
    }
  }

  async alsoAffectedToReproduksi(formRincianPendaratan: FormGroup, reverse = false) {
    if (reverse) {

    } else {
      if (this.hasLinkedFormTo(CONTROL_DATA_REPRODUKSI, extractingValue(formRincianPendaratan.value, PK_COLUMN))) {
        const form = this.specifyLinkedWithRincianPendaratan(CONTROL_DATA_REPRODUKSI, extractingValue(formRincianPendaratan.value, PK_COLUMN));
        RINCIAN_PENDARATAN_X_REPRODUKSI.forEach(c => this.patchAffected(formRincianPendaratan, c.from, form, c.to, c.type));
        PENDARATAN_X_REPRODUKSI.forEach(c => this.patchAffected(this.formPendaratan, c.from, form, c.to, c.type));
      }
    }
  }

  async affectedToPendaratanAndRincianFromOperasional(formOperasional: FormGroup) {

  }

  async affectedToPendaratanAndRincianFromUkuran(formUkuran: FormGroup) {

  }

  async affectedToPendaratanAndRincianFromReproduksi(formReproduksi: FormGroup) {

  }



  selected($event: MatAutocompleteSelectedEvent) {
    // console.log($event);
    // console.log(this.formPendaratan);
  }


  pencatatSource = (): Observable<any[]> => {
    return of([
      { uuid: '1', nama: 'Muhammad Nur Annas', posisi: '' },
      { uuid: '2', nama: 'I Komang Suryana', posisi: '' },
      { uuid: '3', nama: 'Syaifullah', posisi: '' },
      { uuid: '4', nama: 'Arfan', posisi: '' }
    ]);
  };


  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'F2') {
      fromMaterialExportAsNative(this.targetOrganisasi).focus();
    }
  }

  rincianPendaratan(f: FormGroup | any) {
    if (!this.clickOnRincianPendaratanMenu) {
      this.openRincianPendaratan(f);
    } else {
      console.log('dont open')
    }
  }

  clickMenu(mTrigger: MatMenuTrigger | any) {
    console.log('click menu', mTrigger)
    this.clickOnRincianPendaratanMenu = true;

    this.menuTrigger = mTrigger;

    /*RESET*/
    setTimeout(() => this.clickOnRincianPendaratanMenu = false, 500);
  }

  createOperasional() {
    if (!this.creatingOperasional) {
      console.log('creatingOperasional ...');
      // this.menuTrigger.toggleMenu();
      // console.log(this.menuTrigger)
      // this.creatingOperasional = true;
    }


    // this.menu.op
  }

  createUkuran() {
    this.creatingUkuran = true;
  }

  createReproduksi() {
    this.creatingReproduksi = true;
  }

}
